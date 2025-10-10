<script lang="ts" setup>
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'
import { X, MoveLeft, Copy } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import {
  CUSTOM_SYMBOLS,
  makeDefaultSymbolData,
  makeSymbolDataFromRegex,
  type ElementSymbol,
} from '@/scripts/utils/symbols'
import CustomSymbol from './CustomSymbol.vue'
import ElementSelect from './ElementSelect.vue'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
const toast = useToast()
const visible = defineModel<boolean>('visible')
const {insertSymbol} = defineProps<{insertSymbol: (name:string)=>void}>()
// variables associated with custom symbol
const name = ref<string | null>(null)
const data = computed(() => (name.value ? CUSTOM_SYMBOLS[name.value] : null))
const nullableInputTokens = ref<any[]>([])
const syntax = computed(() => {
  if (nullableInputTokens.value == null) {
    return ''
  }
  return nullableInputTokens.value
    .map((val: any, i) => {
      if (val == null && data.value?.values[i].type != 'constant') {
        return String(data.value?.values[i].default)
      }
      return String(val)
    })
    .join('_')
})
const renderData = computed(() => {
  return name.value != null ? makeSymbolDataFromRegex(syntax.value, name.value) : null
})
function open() {
  name.value = null
}
function goToCustomizationForm(symbolName: string) {
  name.value = symbolName
  if (data.value) {
    nullableInputTokens.value = data.value.values.map((token) =>
      token.type == 'constant' ? token.value : token.default,
    )
  }
}

function copy() {
  var textarea = document.createElement('textarea')
  textarea.textContent = `\{\{${syntax.value}\}\}`
  textarea.style.position = 'fixed'
  document.body.appendChild(textarea)
  textarea.select()
  try {
    document.execCommand('copy')
    toast.add({
        severity: 'success',
        summary: 'Copied',
        life: 4000,
      })
  } catch (ex) {
     toast.add({
        severity: 'error',
        summary: 'Failed to Copy',
        life: 4000,
      })
  } finally {
    document.body.removeChild(textarea)
  }
}

function insert() {
  visible.value = false
  insertSymbol(syntax.value)
}
</script>
<template>
  <Toast>
    <template #messageicon>
      <Copy></Copy>
    </template>
  </Toast>
  <Dialog
    v-model:visible="visible"
    modal
    :header="`Custom Symbols ${name ? '- ' + name : ''}`"
    :style="{ width: '45rem' }"
    :breakpoints="{ '800px': '80vw' }"
    :draggable="false"
    @show="open"
  >
    <template #closebutton="{ closeCallback }">
      <X class="close-x" @click="closeCallback" role="button"></X>
    </template>
    <template #default>
      <div class="symbol-display" v-if="data == null">
        <div
          v-for="key in Object.keys(CUSTOM_SYMBOLS)"
          role="button"
          :aria-label="key"
          class="symbol-button"
          @click="goToCustomizationForm(key)"
        >
          <span class="button-title">{{ key }}</span>
          <div class="symbol">
            <CustomSymbol :data="makeDefaultSymbolData(key)"></CustomSymbol>
          </div>
        </div>
      </div>
      <div v-else class="symbol-editor">
        <div class="form">
          <div v-for="(token, i) of data.values">
            <label v-if="token.type != 'constant'">
              {{ token.label }}
              <InputNumber
                v-if="token.type == 'number'"
                :min="token.min"
                :max="token.max"
                :default-value="token.default"
                v-model="nullableInputTokens[i]"
              ></InputNumber>
              <ElementSelect
                v-else-if="token.type == 'element'"
                :default-value="token.default"
                v-model="nullableInputTokens[i]"
              >
              </ElementSelect>
            </label>
          </div>
        </div>
        <div class="symbol-container">
          <span class="symbol-container-title">{{ name }}</span>
          <span class="symbol-wrapper">
            <CustomSymbol :data="renderData"></CustomSymbol>
          </span>
          <div class="symbol-lable">
            <code>&lcub;&lcub;{{ syntax }}&rcub;&rcub;</code>
            <Button class="secondary copy" @click="copy" aria-label="Copy"><Copy></Copy></Button>
          </div>
        </div>
      </div>
      
    </template>
    <template #footer>
      <div class="dialog-footer">
        <Button v-if="name != null" class="secondary left" @click="name = null"
          ><MoveLeft></MoveLeft> Back</Button
        >
        <Button class="secondary" @click="visible = false">Close</Button>
        <Button v-if="name != null" @click="insert">Insert</Button>
      </div>
    </template>
  </Dialog>
</template>
<style scoped>
.symbol-display {
  display: flex;
  flex: row;
  flex-wrap: wrap;
  gap: 10px;
}
.symbol-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px;
  height: 175px;
  padding: 10px;
  background-color: var(--p-surface-100);
  border-radius: 10px;
  cursor: pointer;
}
.symbol-button:hover {
  background-color: var(--p-surface-200);
  transition: 0.3s;
}
.button-title {
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
}
.symbol {
  transform: scale(3);
  margin-top: 20px;
}
.symbol-editor {
  display: flex;
  gap: 30px;
}
.form {
  width: 100%;
}
.symbol-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  display: flex;
  flex-direction: column;
  min-height: 400px;
  gap: 10px;
  background-color: var(--p-surface-100);
  padding: 20px;
  border-radius: 10px;
}
.symbol-wrapper {
  transform: scale(4);
  margin-bottom: 40px;
}
code {
  font-family: monospace;
  color: var(--p-surface-600);
  background-color: var(--p-surface-200);
  border-radius: 3px;
  padding: 5px;
}
.symbol-container-title {
  font-size:20px;
  font-weight: bold;
  text-align: center;
  padding-bottom: 25px;;
}
.symbol-lable {
  display: flex;
  gap: 10px;
}
.copy {
  width: 30px;
  height: 30px;
  padding: 5px;
}

.left {
  margin-right: auto;
}
</style>
