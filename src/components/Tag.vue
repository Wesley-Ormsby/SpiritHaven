<script setup lang="ts">
import Tag from 'primevue/tag';
const {tag, size} = defineProps<{tag:string,size:"normal"|"small"}>()
</script>

<template>
    <RouterLink :to="`/search/article?tags=${encodeURIComponent(tag)}`"><Tag value="Primary" rounded class="tag" :class="{small:size=='small'}">{{ tag }}</Tag></RouterLink>
</template>
<style scoped>
.tag {
    text-transform: capitalize;
    cursor: pointer;
    transition:0.2s;
}
.my-app-dark .tag {
  background-color: var(--p-primary-900);
}
.tag:hover {
  color:var(--p-primary-500);
}
.small {
  font-size: 9px;
}
</style>
