<script lang="ts" setup>
import MultiSelect from 'primevue/multiselect'
import Chip from 'primevue/chip'
import { TAGS } from '@/scripts/data'
import { ref } from 'vue'
const allTags = ref(TAGS.map((tag) => ({ tag })))

const selectedTags = defineModel<{ tag: string }[]>({ required: true })
</script>
<template>
  <MultiSelect
    v-model="selectedTags"
    display="chip"
    :options="allTags"
    optionLabel="tag"
    fluid
    filter
    class="multiselect"
  >
    <template #chip="{ value, removeCallback }">
      <Chip removable @remove="removeCallback($event, value)">
        <span class="chip-text">{{ value.tag }}</span>
      </Chip>
    </template>
    <template #option="slotProps">
      <div style="text-transform:capitalize;">{{ slotProps.option.tag }}</div>
    </template>
  </MultiSelect>
</template>

<style lang="css" scoped>
.chip-text {
  text-transform: capitalize;
  font-size: 12px;
}
.multiselect {
  height:38px;
}
</style>
