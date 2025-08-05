<script lang="ts" setup>
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import { X } from 'lucide-vue-next'
import { supabase } from '@/scripts/auth'
import { ref } from 'vue'
import type { ArticleData } from '@/scripts/types'
import router from '../router'
import { setSupabaseError } from '@/scripts/supabaseErrors'

const model = defineModel<boolean>({ required: true })
const props = defineProps<{ article: ArticleData }>()
const loading = ref(false)
async function deleteArticle() {
  loading.value = true
  const { error } = await supabase.from('articles').delete().eq('id', props.article.id).select()
  if(error) {
    loading.value = false
    return setSupabaseError(error)
  }
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
      <Button @click="deleteArticle" :loading="loading">Delete Deck</Button>
    </div>
    </template>
  </Dialog>
</template>
<style scoped>
.primary {
  color: var(--p-primary-500);
  font-weight: bold;
}
</style>
