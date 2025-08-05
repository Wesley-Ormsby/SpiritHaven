<script lang="ts" setup>
import Listbox from 'primevue/listbox';
import { CATEGORIZED_TAGS, TAGS } from '@/scripts/data'
const allTags = Object.keys(CATEGORIZED_TAGS).map(label=>({
    label,
    items: CATEGORIZED_TAGS[label].map(tag=>({tag}))
  }))

const selectedTags = defineModel<{ tag: string }[]>({ required: true })

</script>
<template>
  <Listbox v-model="selectedTags" :options="allTags" optionLabel="tag" optionGroupLabel="label" optionGroupChildren="items" multiple filter scrollHeight="14rem" @change="console.log(selectedTags)" checkmark>
    <template #optiongroup="slotProps">
            <div class="primary">{{ slotProps.option.label }}</div>
    </template>
    <template #option="{option,selected}">
            <div class="option">{{ option.tag }}</div>
    </template>
</Listbox>
</template>

<style lang="css" scoped>
.option {
  text-transform: capitalize;
  font-size: 14px;
}
</style>
