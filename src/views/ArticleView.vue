<script setup lang="ts">
import { supabase, userData } from '@/scripts/auth'
import type { ArticleData } from '@/scripts/types'
import { articleData, notFoundPage, profileData } from '@/scripts/globalStore'
import { watch, computed, ref, onMounted, onUnmounted } from 'vue'
import { SquareSplitHorizontal, Eye, Pencil } from 'lucide-vue-next'
import router from '../router'
import { useRoute } from 'vue-router'
import Editor from '@/components/Editor.vue'
import Article from '@/components/Article.vue'
import Button from 'primevue/button'

const route = useRoute()
watch(
  () => route.params.id,
  async (newId, oldId) => {
    const { data, error } = await supabase.from('articles').select().eq('id', newId)
    if (!error) {
      articleData.value = data[0] as ArticleData
      const searchResult = await supabase.from('Users').select().eq('id', articleData.value.user)
      if (!searchResult.error) {
        profileData.value = searchResult.data[0]
      } else {
        // Could not get user
        router.push('/NotFound')
        notFoundPage.value = window.location.href
      }
    } else {
      router.push('/NotFound')
      notFoundPage.value = window.location.href
    }
  },
)

/* Display layout */
type DisplayLayout = 'preview' | 'split' | 'editor'
const display = ref<DisplayLayout>('preview')
const splitSizingPossible = ref(false)
function isSplitSizingPossible() {
  splitSizingPossible.value = window.innerWidth >= 800
  if(!splitSizingPossible.value && display.value=='split')  {
    display.value = 'editor'
  }
}

onMounted(() => {
  window.addEventListener("resize", isSplitSizingPossible)
  if (isMyPage.value) {
    display.value = 'split'
  } else {
    display.value = 'preview'
  }
  isSplitSizingPossible()
})
onUnmounted(()=>{
  window.removeEventListener("resize", isSplitSizingPossible)
})

const isMyPage = computed(
  () =>
    userData.value != null &&
    articleData.value != null &&
    userData.value.id == articleData.value.user,
)
const showFooter = computed(()=>display.value=="preview")
</script>

<template>
  <div v-if="articleData != null" class="article-view-container">
    <div>
      <div class="full-screen">
        <Editor v-if="display == 'editor' || display == 'split'" :class="{'split-editor':display=='split'}"></Editor>
        <Article v-if="display == 'preview' || display == 'split'" :class="{'split-preview':display=='split'}" :showFooter></Article>
      </div>
    </div>
    <div class="layout-swapper" v-if="isMyPage">
      <Button
        v-if="display != 'editor'"
        @click="display = 'editor'"
        v-tooltip.top="{
          value: 'editor view',
          showDelay: 1000,
          pt: { text: { style: { 'font-size': '10px', padding: '4px' } } },
        }"
      >
        <Pencil></Pencil>
      </Button>
      <Button
        v-if="display != 'split' && splitSizingPossible"
        @click="display = 'split'"
        v-tooltip.top="{
          value: 'split view',
          showDelay: 1000,
          pt: { text: { style: { 'font-size': '10px', padding: '4px' } } },
        }"
      >
        <SquareSplitHorizontal></SquareSplitHorizontal>
      </Button>
      <Button
        v-if="display != 'preview'"
        @click="display = 'preview'"
        v-tooltip.top="{
          value: 'preview view',
          showDelay: 1000,
          pt: { text: { style: { 'font-size': '10px', padding: '4px' } } },
        }"
      >
        <Eye></Eye>
      </Button>
    </div>
  </div>
  
</template>

<style scoped>
.article-view-container {
  position: relative;
  height: 100vh;
  padding-top: 60px; /* for nav */
}
.full-screen {
  height: calc(100vh - 60px);
  width:100vw;
  display:flex;
  flex-direction: row;
}
.full-screen > * {
  flex:1;
}
.split-editor {
  flex: 0 0 60%;
}
.split-preview {
  flex: 1;
}
.layout-swapper {
  width: min-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: var(--p-primary-500);
  overflow: hidden;
  border-radius: 10px;

  z-index: 100;
  position: absolute;
  right: 10px;
  bottom: 10px;
}
::v-deep(.p-button) {
  border-radius: 0px;
}
</style>
