<script lang="ts" setup>
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { X } from 'lucide-vue-next'
import { ref } from 'vue'
import type { UserData } from '@/scripts/types'
import { supabase } from '@/scripts/auth'
import TagMultiselect from './TagMultiselect.vue'
import { allUsers } from '@/scripts/globalStore'
import SpiritAvatar from './SpiritAvatar.vue'
import Select from 'primevue/select'
const model = defineModel<boolean>({ required: true })

const props = defineProps<{ q: string; tags: string[]; id: string }>()

const input = ref('')
const author = ref<UserData | null>(null)
const selectedTags = ref<{ tag: string }[]>([])
const loadingUsers = ref(true)

async function open() {
  input.value = props.q
  selectedTags.value = props.tags.map((tag)=>({tag}))
  allUsers.value = []
  loadingUsers.value = true

  let { data, error } = await supabase.from('Users').select()
  if (!error) {
    allUsers.value = data as UserData[]
  }
  for (let user of allUsers.value) {
    if (user.id == props.id) {
      author.value = user
      break
    }
  }
  loadingUsers.value = false
}

function saveFilters() {
  var searchParams = new URLSearchParams(window.location.search)
  if (author.value) {
    searchParams.set('author', author.value.id)
  }
  if (selectedTags.value.length >= 1) {
    let tagStr = selectedTags.value.map((tag)=>tag.tag).join(',')
    searchParams.set('tags', tagStr)
  }
  searchParams.set('q', input.value)
  window.location.search = searchParams.toString()
}
</script>
<template>
  <Dialog
    v-model:visible="model"
    modal
    header="More Filters"
    :style="{ width: '25rem' }"
    :breakpoints="{ '600px': '80vw' }"
    :draggable="false"
    @show="open"
  >
    <template #closebutton="{ closeCallback }">
      <X class="close-x" @click="closeCallback"></X>
    </template>
    <div class="form">
      <label>
        Article Title
        <InputText size="small" type="text" v-model="input" placeholder="..." :fluid="true" />
      </label>
      <label>
        Article Tags
        <TagMultiselect v-model="selectedTags"></TagMultiselect>
      </label>
      <label>
        Article Author
        <Select
          v-model="author"
          :options="allUsers"
          filter
          optionLabel="username"
          placeholder="Select an Author"
          class="userSelect"
        >
          <template #value="slotProps">
            <div class="author-value" v-if="slotProps.value">
              <div class="select-option">
                <SpiritAvatar class="select-image" :spirit="slotProps.value.spirit"></SpiritAvatar>
                <div>{{ slotProps.value.username }}</div>
              </div>
              <X @click.prevent="author = null" class="removeAuthor"></X>
            </div>
            <span v-else class="author-value">
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div class="select-option">
              <SpiritAvatar class="select-image" :spirit="slotProps.option.spirit"></SpiritAvatar>
              <div>{{ slotProps.option.username }}</div>
            </div>
          </template>
        </Select>
      </label>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <RouterLink to="/search/article"><Button class="secondary">Reset</Button></RouterLink>
        <Button @click="saveFilters">Save Filters</Button>
      </div>
    </template>
  </Dialog>
</template>
<style scoped>
/* FORM */
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
label {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.select-option {
  display: flex;
  flex-direction: row;
  text-transform: capitalize;
  align-items: center;
  gap: 10px;
  max-width: 60vw;
}
.select-option div {
  overflow: hidden;
  text-overflow: ellipsis;
}
.select-image {
  width: 30px;
  height: 30px;
  flex-shrink: 0;
}
.userSelect {
  height: 46px;
}
.removeAuthor {
  color: var(--p-surface-400);
  transition: 0.3s color;
  width: min-content;
}
.removeAuthor:hover {
  color: var(--p-surface-900);
  margin:0px;
}
.author-value {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
.author-value .select-option {
  max-width: 250px;
  overflow:hidden;
}
/* HEADER + FOOTER */
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}
.secondary {
  background-color: var(--p-surface-300);
  border-color: var(--p-surface-300) !important;
  color: var(--p-surface-900) !important;
}
.secondary:hover {
  background-color: var(--p-surface-400) !important;
}
.close-x {
  stroke: var(--p-surface-600);
  transition: 0.3s stroke;
  cursor: pointer;
}
.close-x:hover {
  stroke: var(--p-surface-900);
}
@media only screen and (max-width: 500px) {
  ::v-deep(.p-message-text) {
    font-size: 10px !important;
  }
  .multiselect-option-text,
  .list-option span {
    font-size: 12px;
  }
}
</style>
