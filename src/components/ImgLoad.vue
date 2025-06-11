<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import Dialog from 'primevue/dialog'
import { X, Eye } from 'lucide-vue-next'
const props = defineProps<{
  src: string | null
  alt: string
  preview: boolean
}>()
const model = defineModel<boolean>()
const loading = ref(true)
const timeout = ref()
const previewVisability = ref(false)

onMounted(() => {
  timeout.value = setTimeout(notLoaded, 5000)
})

watch(
  () => props.src,
  () => {
    loading.value = true
    // The model value will be set to flase in the parent component: model.value = false
    clearTimeout(timeout.value)
    timeout.value = setTimeout(notLoaded, 5000)
  },
)
function notLoaded() {
  if (props.src != null && loading.value) {
    model.value = true
  }
}
function onLoad() {
  model.value = false
  loading.value = false
  clearTimeout(timeout.value)
}
function clickFunction() {
  if (props.preview) {
    previewVisability.value = true
  }
}
</script>
<template>
  <div class="loading-container" :class="{ preview: props.preview }" @click="clickFunction">
    <img class="img" :src="props.src || ''" @load="onLoad" v-show="!loading" :alt="props.alt" />
    <Eye class="preview-icon"></Eye>
    <svg
      v-show="loading && !model"
      width="24"
      height="24"
      stroke="#000"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g class="spinner_V8m1">
        <circle cx="12" cy="12" r="9.5" fill="none" stroke-width="3"></circle>
      </g>
    </svg>
    <Dialog
      v-model:visible="previewVisability"
      modal
      pt:root:style="border:0px transparent;background-color:transparent;box-shadow:none;"
      dismissableMask
    >
      <template #container="{ closeCallback }">
        <div class="image-preview-dialog">
          <img class="dialog-img" :src="props.src || ''" />
          <div @click="closeCallback" class="close-button">
            <X></X>
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<style lang="css" scoped>
.img,
.loading-container {
  width: inherit;
  height: inherit;
}
.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.spinner_V8m1 {
  width: inherit;
  height: inherit;
  transform-origin: center;
  animation: spinner_zKoa 2s linear infinite;
}
.spinner_V8m1 circle {
  stroke: var(--p-surface-500);
  stroke-linecap: round;
  animation: spinner_YpZS 1.5s ease-in-out infinite;
}
@keyframes spinner_zKoa {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes spinner_YpZS {
  0% {
    stroke-dasharray: 0 150;
    stroke-dashoffset: 0;
  }
  47.5% {
    stroke-dasharray: 42 150;
    stroke-dashoffset: -16;
  }
  95%,
  100% {
    stroke-dasharray: 42 150;
    stroke-dashoffset: -59;
  }
}

/* Preview */
.img {
  transition: filter 0.2s;
}
.dialog-img {
    max-width: 90vw;
}
.preview {
  cursor: pointer;
}
.preview:hover img {
  filter: brightness(0.7);
}
.preview-icon {
  opacity: 0;
  transition: 0.2s opacity;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  stroke: var(--p-zinc-100);
}
.preview:hover .preview-icon {
  opacity: 1;
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
