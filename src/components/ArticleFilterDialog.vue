<script lang="ts" setup>
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { X } from 'lucide-vue-next'
import { ref } from 'vue'
import type { UserData } from '@/scripts/types'
import { supabase } from '@/scripts/auth'
import TagMultiselect from './TagMultiselect.vue'
import { useGlobalStore } from '@/scripts/globalStore'
import SpiritAvatar from './SpiritAvatar.vue'
import Select from 'primevue/select'
import { setSupabaseError } from '@/scripts/supabaseErrors'
import { useRouter } from 'vue-router'
const router = useRouter()

const { allUsers } = useGlobalStore
const model = defineModel<boolean>({ required: true })

const props = defineProps<{ q: string; tags: string[]; id: string }>()

const input = ref('')
const author = ref<UserData | null>(null)
const selectedTags = ref<{ tag: string }[]>([])
const loadingUsers = ref(true)

async function open() {
  input.value = props.q
  selectedTags.value = props.tags.map((tag) => ({ tag }))

  // Load all users unless it has already been done (note: this will not update for new users unless the tab is reloaded)
  if (!allUsers.value.length) {
    loadingUsers.value = true
    let { data, error } = await supabase.from('Users').select()
    if (!error) {
      allUsers.value = data as UserData[]
      loadingUsers.value = false
    } else {
      return setSupabaseError(error)
    }
  }
  for (let user of allUsers.value) {
    if (user.id == props.id) {
      author.value = user
      break
    }
  }
}

function saveFilters() {
  const newQuery: Record<string, string> = { q: input.value }
  if (author.value) {
    newQuery.author = author.value.id
  }
  if (selectedTags.value.length >= 1) {
    newQuery.tags = selectedTags.value.map((tag) => tag.tag).join(',')
  }
  router.replace({ query: newQuery })
  model.value = false
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
        <InputText
          size="small"
          type="text"
          v-model="input"
          placeholder="Search articles"
          :fluid="true"
        />
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
              <div class="f-select-option">
                <div class="f-select-option-image"><SpiritAvatar :spirit="slotProps.value.spirit"></SpiritAvatar></div>
                <div class="text">{{ slotProps.value.username }}</div>
              </div>
              <X @click.prevent="author = null" class="removeAuthor"></X>
            </div>
            <span v-else class="author-value">
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div class="f-select-option">
              <div class="f-select-option-image"><SpiritAvatar :spirit="slotProps.option.spirit"></SpiritAvatar></div>
              <div>{{ slotProps.option.username }}</div>
            </div>
          </template>
        </Select>
      </label>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <RouterLink to="/search/article"><Button class="secondary" @click="model = false">Reset</Button></RouterLink>
        <Button @click="saveFilters">Save Filters</Button>
      </div>
    </template>
  </Dialog>
</template>
<style scoped>
/* FORM */
.userSelect {
  height: 46px;
}
.removeAuthor {
  color: var(--p-surface-400);
  transition: 0.3s color;
  flex-shrink: 0;
}
.removeAuthor:hover {
  color: var(--p-surface-900);
}
.author-value {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-width: 0;
}
.author-value .f-select-option {
  min-width: 0;
}
.author-value .f-select-option .text {
  flex: 1;
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
