<script setup lang="ts">
import { RouterView } from 'vue-router'
import { setupUser } from './scripts/auth'
import { onBeforeMount, watch } from 'vue'
import Nav from './components/Nav.vue'
import { useGlobalStore } from './scripts/globalStore'
import ProgressBar from 'primevue/progressbar'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { supabaseError } from './scripts/supabaseErrors'
const { preLoading } = useGlobalStore
// AUTH
onBeforeMount(setupUser)

// Any Supabase-related error
const toast = useToast()
watch(
  () => supabaseError.value,
  () => {
    if (supabaseError.value != null) {
      toast.add({
        severity: 'error',
        summary: supabaseError.value.message,
        detail: supabaseError.value.code,
        life: 4000,
      })
      supabaseError.value = null
    }
  },
)
</script>

<template>
  <Toast />
  <div v-if="preLoading">
    <ProgressBar mode="indeterminate" style="height: 3px"></ProgressBar>
  </div>
  <div v-else>
    <h1>This website is temporarily unavailable</h1>
    <p>Thank you for your patience. </p>
    <p>Before the error is fixed, the <a href="https://spiritislandwiki.com/">Wiki</a> must be operating.</p>
    <!--
    <Nav></Nav>
    <RouterView />
    --->
  </div>
</template>

<style scoped>
::v-deep(.p-progressbar) {
  border-radius: 0px;
}
h1, p {
  text-align: center;
}
</style>
