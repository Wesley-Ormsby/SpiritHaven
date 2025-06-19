<script setup lang="ts">
import type { HeaderData } from '@/scripts/types';
import {ref, onUpdated, nextTick, onMounted } from 'vue'


const {section} = defineProps<{section:HeaderData|HeaderData[]}>()
const headerContent = ref("")
onUpdated(updateContent)
onMounted(updateContent)
async function updateContent() {
    await nextTick()
    if(!Array.isArray(section)) {
        headerContent.value = (document.querySelector(`#header${section.id}`) as HTMLElement)?.innerText || ""
    }
}
</script>

<template>
<div v-if="Array.isArray(section)" class="section">
    <TableOfContentsSection v-for="header in section" :section="header"></TableOfContentsSection>
</div>
<div v-else>
    <a :href='`#header${section.id}`' :data-match='section.id'>{{ headerContent }}</a>
    <TableOfContentsSection :section="section.children"></TableOfContentsSection>
</div>
</template>
<style scoped>
 .section {
    display:flex;
    flex-direction: column;
    gap:3px;
    margin-left:20px;
    overflow-x: hidden;
 }
 a {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;   
  text-decoration: none; 
 }
/* Note: Link style in mian.css */
</style>
