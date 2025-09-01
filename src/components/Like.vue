<script setup lang="ts">
import type { ArticleData } from '@/scripts/types'
import { useGlobalStore } from '@/scripts/globalStore'
import { computed } from 'vue'
import { Heart } from 'lucide-vue-next'
import { supabase } from '@/scripts/auth'
import { setSupabaseError } from '@/scripts/supabaseErrors'
const { userData, userLikes } = useGlobalStore

const { articleData } = defineProps<{ articleData: ArticleData }>()
const likes = defineModel<number>('likes', { required: true })
const liked = computed(() => userLikes.value.includes(articleData.id))
const singedIn = computed(() => userData.value != null)

async function like() {
  if (liked.value) {
    userLikes.value = userLikes.value.filter((article) => article != articleData.id)
    likes.value -= 1
    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('user', userData.value?.id)
      .eq('article', articleData.id)
    if (error) setSupabaseError(error)
  } else {
    userLikes.value.push(articleData.id)
    likes.value += 1
    const { error } = await supabase.from('likes').insert({ user: userData.value?.id, article: articleData.id })
    if (error) setSupabaseError(error)
  }
}
</script>

<template>
  <div class="flex-row">
    <span>{{ likes }}</span>
    <button v-if="!singedIn || articleData.user == userData?.id" disabled="true"><Heart /></button>
    <button
      v-else
      @click="like"
      :key="String(liked)"
      v-tooltip.bottom="{
        value: liked ? 'unlike' : 'like',
        showDelay: 1000,
        pt: { text: { style: { 'font-size': '10px', padding: '4px' } } },
      }"
    >
      <Heart :class="{ liked }"></Heart>
    </button>
  </div>
</template>

<style lang="css" scoped>
* {
  color: var(--p-primary-500);
}
button {
  background-color: transparent;
  padding: 5px;
  border-radius: 100%;
  border: 0px solid transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px;
}
button:not(:disabled) {
  cursor: pointer;
}
button svg {
  height: 20px;
  width: 20px;
}

button:hover:not(:disabled) {
  transition: 0.3s;
  background-color: var(--p-primary-100);
}
.my-app-dark button:hover:not(:disabled) {
  background-color: var(--p-primary-900);
}
.liked {
  fill: var(--p-primary-500);
}
.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  flex-shrink: 0;
  gap: 4px; 
}
</style>
