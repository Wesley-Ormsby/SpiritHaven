<script setup lang="ts">
import type { UserData } from '@/scripts/types'
import SpiritAvatar from './SpiritAvatar.vue';
import Skeleton from 'primevue/skeleton';
import { Card } from 'primevue';
import router from '@/router';

const props = defineProps<{data:UserData|null}>()
</script>

<template>
  <Card v-if="props.data" class="user-card">
    <template #content>
      <span class="user-flex" @click="router.push({ name: 'profile', params: { id: props.data.id } })">
        <SpiritAvatar :spirit="props.data.spirit" class="user-avatar"></SpiritAvatar>
        <div class="username">{{ props.data.username }}</div>
      </span>
  </template>
  </Card>
  <Skeleton v-else class="user-card skeleton"></Skeleton>
</template>

<style lang="css" scoped>
.user-card {
  width: 350px !important;
  height:66px !important;
  --p-card-body-padding:15px;
  border-radius: var(--p-card-border-radius);
  overflow: hidden;
  border:0.5px solid var(--p-primary-100);
  cursor: pointer;
}
.my-app-dark .user-card {
    border:0.5px solid var(--p-primary-900)
}
.user-card:hover {
  outline:1px solid var(--p-primary-500)
}
.skeleton {
  border:0px solid transparent !important;
}
.user-avatar {
    width:36px;
    height: 36px;
    flex-shrink: 0;
}
.user-flex {
    cursor: pointer;
    display:flex;
    align-items: center;
    gap:10px;
    color:var(--p-primary-500);
    font-size: 20px;
    overflow: hidden;
}
.username {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
