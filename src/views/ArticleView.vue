<script setup lang="ts">
import { useGlobalStore } from '@/scripts/globalStore'
import { watch, computed, ref, onMounted, onUnmounted } from 'vue'
import { SquareSplitHorizontal, Eye, Pencil } from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import Editor from '@/components/Editor.vue'
import Article from '@/components/Article.vue'
import Button from 'primevue/button'
import { loadArticle } from '@/scripts/utils/loadArticle'
const { articleData, userData } = useGlobalStore
const route = useRoute()

watch(
  () => route.params.id,
  async (newId, oldId) => {
    await loadArticle(newId)
  },
)

/* Display layout */
type DisplayLayout = 'preview' | 'split' | 'editor'
const display = ref<DisplayLayout>('preview')
const splitSizingPossible = ref(false)
function isSplitSizingPossible() {
  splitSizingPossible.value = window.innerWidth >= 800
  if (!splitSizingPossible.value && display.value == 'split') {
    display.value = 'editor'
  }
}

onMounted(() => {
  window.addEventListener('resize', isSplitSizingPossible)
  if (isOwner.value) {
    display.value = 'split'
  } else {
    display.value = 'preview'
  }
  isSplitSizingPossible()
})
onUnmounted(() => {
  window.removeEventListener('resize', isSplitSizingPossible)
})

const isOwner = computed(
  () => userData.value != null && articleData != null && userData.value.id == articleData.user,
)
const showFooter = computed(() => display.value == 'preview')
</script>

<template>
  <div v-if="articleData != null" class="article-view-container">
    <div>
      <div class="full-screen">
        <Editor
          v-if="display == 'editor' || display == 'split'"
          :class="{ 'split-editor': display == 'split' }"
        ></Editor>
        <Article
          v-if="display == 'preview' || display == 'split'"
          :class="{ 'split-preview': display == 'split' }"
          :showFooter
        ></Article>
      </div>
    </div>
    <div class="layout-swapper" v-if="isOwner">
      <Button
        v-if="display != 'editor'"
        @click="display = 'editor'"
        v-tooltip.top="{
          value: 'Editor view',
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
          value: 'Split view',
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
          value: 'Preview view',
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
  width: 100vw;
  display: flex;
  flex-direction: row;
}
.full-screen > * {
  flex: 1;
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
