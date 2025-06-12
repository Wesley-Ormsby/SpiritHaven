<script lang="ts" setup>
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import { X } from 'lucide-vue-next'
import { supabase } from '@/scripts/auth'
import type { ArticleData } from '@/scripts/types'
import router from '../router'

const model = defineModel<boolean>({ required: true })
const props = defineProps<{ article: ArticleData }>()
async function deleteArticle() {
  const { data, error } = await supabase.from('articles').delete().eq('id', props.article.id).select()
  router.push({ name: 'profile', params: { id: props.article.user } })
}
</script>
<template>
  <Dialog
    v-model:visible="model"
    modal
    header="Delete Article"
    :style="{ width: '25rem' }"
    :breakpoints="{ '500px': '80vw' }"
    :draggable="false"
  >
    <template #closebutton="{ closeCallback }">
      <X class="close-x" @click="closeCallback"></X>
    </template>
    <div>
      <p>Deleting an article is a permanent action that cannot be reverted.</p>
      <p>
        Are you sure you want to delete your article
        <span class="primary">{{ props.article.title }}</span
        >?
      </p>
    </div>
    <template #footer>
      <div class="dialog-footer">
      <Button class="secondary" @click="model = false">Cancel</Button>
      <Button @click="deleteArticle">Delete Deck</Button>
    </div>
    </template>
  </Dialog>
</template>
<style scoped>
.primary {
  color: var(--p-primary-500);
  font-weight: bold;
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
</style>
