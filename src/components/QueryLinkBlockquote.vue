<script setup lang="ts">
const { query, description } = defineProps<{ query: string; description: string }>()
</script>

<template>
    <RouterLink :to="{ name: 'searchCards', query: { q: query } }" target="_blank"><blockquote>
        <span class="query">{{ query }}</span>
        <span class="description">{{ description }}</span>
    </blockquote>
    </RouterLink>
</template>

<style lang="css" scoped>
/* Some Styles From Article.vue */
blockquote {
  background-color: var(--p-surface-200);
  margin: 10px;
  border: 0.5px solid var(--p-surface-300);

  /* Added/Altered styles */
  border-left: 3px solid var(--p-primary-300);
  padding: 12px;
  display:flex;
  gap:5px;
  flex-direction: column;
  cursor: pointer;
  transition: 0.2s background-color;
}
blockquote:hover {
    background-color: var(--p-surface-300);
}
* {
    text-decoration: none;
}
.query {
    font-family: monospace;
    color:var(--p-primary-500);
    font-size: 1rem;
}
</style>
