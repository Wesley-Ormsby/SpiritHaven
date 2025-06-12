<script setup lang="ts">
import { RouterView } from 'vue-router'
import { setupUser } from './scripts/auth'
import { onBeforeMount} from "vue"
import Nav from './components/Nav.vue'
import { preLoading } from './scripts/globalStore'
import ProgressBar from 'primevue/progressbar';

// AUTH
onBeforeMount(setupUser)
</script>

<template>
  <div v-if="preLoading">
    <ProgressBar mode="indeterminate" style="height: 3px"></ProgressBar>
  </div>
  <div v-else>
    <Nav></Nav>
    <RouterView />
  </div>
  
</template>

<style scoped>
::v-deep(.p-progressbar){
  border-radius: 0px;
}
</style>
