<script lang="ts" setup>
import Dialog from 'primevue/dialog'
import { X } from 'lucide-vue-next'
const props = defineProps<{
  src: string
}>()
const model = defineModel<boolean>()
</script>
<template>
    <Dialog
      v-model:visible="model"
      modal
      pt:root:style="border:0px transparent;background-color:transparent;box-shadow:none;"
      dismissableMask
      :draggable="false"
    >
      <template #container="{ closeCallback }">
        <div class="image-preview-dialog">
          <img class="dialog-img" :src="props.src" />
          <div @click="closeCallback" class="close-button">
            <X></X>
          </div>
        </div>
      </template>
    </Dialog>
</template>

<style lang="css" scoped>
.dialog-img {
    max-width: 90vw;
    max-height: 90vh;
    border-radius: 10px;
}
.image-preview-dialog {
  position: relative;
  height: min-content;
}
.close-button {
  color: var(--p-zinc-200);
  transition: 0.3s background-color;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.close-button:hover {
  color: var(--p-zinc-100);
  background-color: rgba(0, 0, 0, 0.7);
}
@media only screen and (max-width: 500px) {
   .close-button {
        padding: 8px;
        right: 5px;
  top: 5px;
    }
    .close-button svg {
        width:15px;
        height: 15px;
    }
}
</style>
