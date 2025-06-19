<script setup lang="ts">
import { articleData, profileData } from '@/scripts/globalStore'
import { renderMarkdown } from '@/scripts/markdown'
import { watch, ref, onMounted,computed, nextTick,useTemplateRef, onUnmounted } from 'vue'
import SpiritAvatar from './SpiritAvatar.vue'
import Tag from './Tag.vue';
import {computePosition,autoPlacement,shift,offset} from '@floating-ui/vue'
import { BOARDS, CARD_ARTS, LARGE_COMPONENTS_ARTS } from '@/scripts/data'
import ImageDialog from './ImageDialog.vue'
import Footer from './Footer.vue'
import type { HeaderData } from '@/scripts/types';
import TableOfContentsSection from './TableOfContentsSection.vue';

const {showFooter} = defineProps<{showFooter:boolean}>()
const tableOfContentsData = ref<HeaderData[]>([])
const screenSize = ref(0)
const showSideTableOfContents = computed(()=>Boolean(screenSize.value > 1000 && showFooter))

const markdownHTML = ref('')
onMounted(()=>{
  syncArticle()
  window.addEventListener("resize",updateScreenSize)
  updateScreenSize()
})
onUnmounted(()=>{
  window.removeEventListener("resize",updateScreenSize)
})
function updateScreenSize() {
  screenSize.value = window.screen.width
}
watch(() => articleData.value.content, syncArticle)

function syncArticle() {
  let {render,tableOfContents} = renderMarkdown(articleData.value.content)
  markdownHTML.value = render
  tableOfContentsData.value = tableOfContents
  nextTick(makeGameComponentsInteractable)
}


const updatedDate = computed<string>( ()=> (new Date(articleData.value.updated)).toLocaleDateString("en-US",{year: 'numeric', month: 'long', day: 'numeric' }))

// For Cards and other components
const clickedURL = ref('')
const hoveredURL = ref('')
const hoveringElement = ref()
const stillHovering = ref(false)
const imageDialogVisible = ref(false)
const boardHovering = ref(false)
const tooltip = useTemplateRef('tooltip')
const loadingImg = ref(false)
function makeGameComponentsInteractable() {
  for(var att of ['card','component']) {
    document.querySelectorAll(`[${att}]`).forEach((el)=>{
    const name = el.getAttribute(att) as string
    const url = att === 'card' ? CARD_ARTS[name] : LARGE_COMPONENTS_ARTS[name]
    const isBoard = BOARDS[name] != undefined
    el.addEventListener("click", () =>{
      clickedURL.value = url
      imageDialogVisible.value = true
    })
    el.addEventListener('mouseenter', ()=>startHover(el as HTMLElement,url,isBoard));
    el.addEventListener('mouseleave', hideTooltip);
  })
  }
  document.querySelectorAll(".centered-block img").forEach((el)=>{
    el.addEventListener("click", () =>{
      clickedURL.value = el.getAttribute("src") as string
      imageDialogVisible.value = true
    })
  })
}

function update(el:HTMLElement) {
  if(el == null || tooltip == null) {
    return
  }
computePosition(el, tooltip.value as HTMLElement, {
  placement: 'top',
  middleware: [offset(6),autoPlacement({
    allowedPlacements: ['top', 'bottom']}),shift({padding: 5})],
}).then(({x, y}) => {
  Object.assign((tooltip.value as HTMLElement).style, {
    left: `${x}px`,
    top: `${y}px`,
  });
});
}
function startHover(el:HTMLElement, url:string, isBoard:boolean) {
  el.classList.add("loading-hover")
  boardHovering.value = isBoard;
  stillHovering.value = true
  hoveringElement.value = el;
  hoveredURL.value = url;
  loadingImg.value = true;
}

function showTooltip() {
  if(stillHovering.value) {
    (tooltip.value as HTMLElement).style.display = 'block';
    update(hoveringElement.value);
    loadingImg.value = false;
    hoveringElement.value.classList.remove("loading-hover")
  }
}
 
function hideTooltip() {
  (tooltip.value as HTMLElement).style.display = 'none';
  stillHovering.value = false;
  hoveredURL.value = "";
}
</script>

<template>
  <div class="article-preview-wrapper">
    <div class="article-wrapper">
    <div class="table-of-contents side" v-if="showSideTableOfContents">
        <div class="contents-title">Table of Contents</div>
        <a class="to-top" href="#title">Go to Top</a>
        <TableOfContentsSection :section="tableOfContentsData"></TableOfContentsSection>
      </div>
    <div class="article">
      <div class="title" id="title">{{ articleData.title }}</div>
      <div class="flex-row">
        <RouterLink :to="{ name: 'profile', params: { id: profileData.id } }">
        <span class="user-span">
        <SpiritAvatar :spirit="profileData.spirit" class="user-avatar"></SpiritAvatar>
         {{ profileData.username }}</span>
        </RouterLink>
        <span>|</span><span>Last Changes {{ updatedDate }}</span>
      </div>
      <div class="flex-row wrap">
        <Tag v-for="tag in articleData.tags" :tag="tag" size="normal"></Tag>
      </div>
      <img v-if="articleData.img != null && articleData.img.trim() != ''" class="header-image" :src="articleData.img"></img>
      <div class="table-of-contents" v-if="!showSideTableOfContents">
        <div class="contents-title">Table of Contents</div>
        <TableOfContentsSection :section="tableOfContentsData"></TableOfContentsSection>
      </div>
      <div class="content" v-html="markdownHTML"></div>
      <div ref="tooltip" class="tooltip">
      <img :src="hoveredURL" class="tooltip-img" @load="showTooltip" :class="{shadow:!boardHovering}">
    </div>
    </div>
  </div>
    <ImageDialog v-model="imageDialogVisible"  :src="clickedURL" ></ImageDialog>
    <Footer v-if="showFooter"></Footer>
  </div>
</template>
<style scoped>
.article-preview-wrapper {
  overflow-y: scroll;
  height: 100%;
}
.article-wrapper {
  display:flex;
  flex-direction: row;
}
.article {
  padding: 10px 30px;
  overflow-x: hidden;
  max-width: 900px;
  margin: auto;
  min-height: calc(100vh - 60px);
}

/* Header */
.title {
    font-size: 50px;
    font-weight: bold;
}
.articleData {
    width: 80% !important;
    height: auto;
}
.flex-row {
    display:flex;
    align-items: center;
    gap:10px;
    margin:10px 0px;
}
.wrap {
  flex-wrap: wrap;
}
.user-avatar {
    width:24px;
    height: 24px;
    transition: 0.2s filter;
}
.user-span {
    cursor: pointer;
    display:inline-flex;
    align-items: center;
    gap:5px;
    color:var(--p-primary-500);
}
.user-span:hover {
    text-decoration: underline;
}
.user-span:hover .user-avatar {
    filter:brightness(1.1)
}
.header-image {
  display: block;
  max-width: 80%;
  margin: auto;
}
/* Table of Contents */
* {
  scroll-behavior: smooth;
 }
 .table-of-contents {
  border-left:1px solid var(--p-primary-300);
  margin-top:10px;
  margin-bottom: 10px;
  max-width: 900px;
  height: min-content;
}
.contents-title {
  font-weight: bold;
  margin-left:10px;
}
.side {
  position:sticky;
  top:60px;
  max-width: 300px;
  margin-left:20px;
  margin-top: 60px;
}
.to-top {
  color:var(--p-surface-800) !important;
  font-size: smaller;
  margin-left: 20px;
  text-decoration: none;
}

::v-deep(blockquote) {
  background-color: var(--p-surface-200);
  padding: 0.5px 1px 0px 12px;
  margin: 10px;
  border: 0.5px solid var(--p-surface-300);
  border-left: 2px solid var(--p-primary-300);
}
::v-deep(pre),
::v-deep(code) {
  font-family: monospace;
  color: var(--p-surface-600);
  background-color: var(--p-surface-200);
  border-radius: 3px;
  padding: 5px;
  overflow-x: scroll;
}
::v-deep(pre code) {
  padding: 0px;
}
::v-deep(table),
::v-deep(th),
::v-deep(td) {
  border: 1px solid var(--p-surface-300);
}
::v-deep() table {
  border-collapse: collapse;
}
::v-deep(th),
::v-deep(td) {
  padding: 5px 10px;
}
.content ::v-deep(img):not(.symbol) {
  display: block;
  max-width: 50%;
  margin: auto;
}
* {
  color: var(--p-surface-900);
}
/* Note: Link styles in main.css */
::v-deep(ol p) {
  margin:0px 5px;
}

/* Custom Components */
::v-deep(.inline-component) {
  cursor: pointer;
  color:var(--p-primary-500);
}
.tooltip {
  display: none;
  width: max-content;
  position: absolute;
  top: 0;
  left: 0;
 }
 .tooltip-img {
  max-height: 300px;
  max-width: 80vw;
  border-radius: 8px;
 }
 ::v-deep(.loading-hover) {
  cursor: progress;
 }
 .shadow {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
 }
 ::v-deep(.centered-block) {
  display:flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap:15px;
  padding:10px;
  justify-content: center;
}
::v-deep(.centered-block img) {
  border-radius: 8px;
  max-height: min(270px,70vh); 
  /* Overwrite .content img sytles */
  width:auto !important;
  max-width: 80% !important;
  margin:0px !important;
  cursor: zoom-in;
}
::v-deep(.large) {
  width:auto;
  max-height: 80vh !important;
}
</style>
