<script lang="ts" setup>
import { ref } from 'vue'
import { SYMBOL_DATA } from '@/scripts/data'
import Select from 'primevue/select'
import { elementSymbols, type ElementSymbol } from '@/scripts/utils/symbols'
const model = defineModel<ElementSymbol>({ required: true })
const { defaultValue } = defineProps<{ defaultValue: ElementSymbol }>()

const elementChoices = ref<ElementSymbol[]>([...elementSymbols])
</script>
<template>
  <Select v-model="model" :options="elementChoices" fluid filter :defaultValue="defaultValue">
    <template #value="slotProps">
      <div v-if="slotProps.value" class="f-select-option">
        <img class="f-select-option-image" :src="SYMBOL_DATA[model]" :alt="model"/>
        <div class="capital-case">{{ slotProps.value }}</div>
      </div>
    </template>
    <template #option="slotProps">
      <div class="f-select-option">
        <img :src="SYMBOL_DATA[slotProps.option]" class="f-select-option-image" :alt="slotProps.option"/>
        <div class="capital-case">{{ slotProps.option }}</div>
      </div>
    </template>
  </Select>
</template>
<style scoped>
@media only screen and (max-width: 500px) {
  ::v-deep(.p-textarea),
  .select-option,
  .p-inputtext {
    font-size: 12px !important;
  }
}
</style>
