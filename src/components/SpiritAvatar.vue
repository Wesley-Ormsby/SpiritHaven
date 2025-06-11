<script setup lang="ts">
import type { Spirit } from '@/scripts/types';
import { SPIRITS } from '@/scripts/data';
const props = defineProps<{spirit:Spirit}>()
</script>

<template>
    <div class="spirit-image-container ">
        <img :src="SPIRITS[props.spirit].img_small" class="spirit-image">
    </div>
</template>

<style lang="css" scoped>
.spirit-image-container {
    width: inherit;
    height: inherit;
    aspect-ratio: 1;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
}
.spirit-image {
  display: inline;
  height: 100%;
  width: auto !important;
}
</style>