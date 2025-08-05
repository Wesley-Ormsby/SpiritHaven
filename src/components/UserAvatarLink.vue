<script lang="ts" setup>
import type { UserData } from '@/scripts/types';
import SpiritAvatar from './SpiritAvatar.vue';

const {profile} = defineProps<{profile:UserData}>()
</script>
<template>
    <RouterLink :to="{ name: 'profile', params: { id: profile.id } }" class="link">
          <span class="user-span">
            <SpiritAvatar :spirit="profile.spirit" class="user-avatar"></SpiritAvatar>
            {{ profile.username }}</span
          >
        </RouterLink>
</template>
<style lang="css" scoped>
.link {
    display:flex;
    align-items: center;
}
.user-avatar {
  width: 24px;
  height: 24px;
  transition: 0.2s filter;
}
.user-span {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: var(--p-primary-500);
}
.user-span:hover {
  filter: brightness(1.1);
}
</style>
