<script setup lang="ts">
import { ref } from 'vue'
import Skeleton from 'primevue/skeleton'
const { url } = defineProps<{ url: string }>()
const loaded = ref(false)
</script>

<template>
  <Skeleton v-if="!loaded" class="skeleton" />
  <img v-show="loaded" :src="url" @load="loaded = true" />
</template>

<style lang="css" scoped>
img,
.skeleton {
  border-radius: 8px;
  height: 350px;
  display: block;
  margin: 0px;
}
.skeleton {
  aspect-ratio: 5/7;
  border-radius: 8px;
  height: 350px !important;
  width: 250px !important;
}
@media only screen and (max-width: 1000px) {
  img,
  .skeleton {
    height: 280px;
  }
  .skeleton {
    height: 280px !important;
    width: 200px !important;
  }
}
@media only screen and (max-width: 530px) {
  img,
  .skeleton {
    height: 210px;
  }
  .skeleton {
    height: 210px !important;
    width: 150px !important;
  }
}
</style>
