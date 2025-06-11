<script setup lang="ts">
import { ref, useTemplateRef,computed,onMounted } from 'vue'
import { notFoundPage } from '@/scripts/globalStore'
import Footer from '@/components/Footer.vue'
import Button from 'primevue/button'
import router from '@/router'

const voidImage = ref<HTMLImageElement | null>(null)
const scatteredURLS = useTemplateRef("scatteredURLS")
const numberOfURLS = 10
const pullingElements = computed(()=>{
  const els = []
  const inContainer = document.body.querySelectorAll(
    '.container-404 > *:not(img):not(.clickable)') as unknown as HTMLElement[]
  inContainer.forEach(el=>els.push(el))
  if(scatteredURLS.value) {
    for(let el of scatteredURLS.value) {
      els.push(el)
    }
  } 
  return els || [];
})
const scatterStyles = ref<{ transform: string }[]>([])
onMounted(() => {
  const screenSize = Math.max(window.innerWidth, window.innerHeight)

  scatterStyles.value = Array.from({ length: numberOfURLS }).map(() => {
    const angle = Math.random() * Math.PI * 2
    const radius = screenSize + Math.random() * 100 // push offscreen
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    return { transform: `translate(${x}px, ${y}px)` }
  })
})
let pulling = ref(false)

function goHome() {
  router.push('/')
}

function startPull() {
  pulling.value = true
  pull()
}

function pull() {
  if (!voidImage.value || !pullingElements.value) {
    return
  }

  const voidRect = voidImage.value.getBoundingClientRect()
  const voidX = voidRect.left + voidRect.width / 2
  const voidY = voidRect.top + voidRect.height / 2

  pullingElements.value.forEach((el) => {
    const rect = el.getBoundingClientRect()
    const elX = rect.left + rect.width / 2
    const elY = rect.top + rect.height / 2

    const dx = voidX - elX
    const dy = voidY - elY
    const dist = Math.sqrt(dx * dx + dy * dy)

    const moveX = dx * Math.min(dist / 300, 0.01) // lower = slower, easing-like
    const moveY = dy * Math.min(dist / 300, 0.01)

    // Accumulate movement
    const prevTransform = el.style.transform
    const match = /translate\(([-\d.]+)px,\s*([-\d.]+)px\)/.exec(prevTransform)
    const [prevX, prevY] = match ? [parseFloat(match[1]), parseFloat(match[2])] : [0, 0]

    const newX = prevX + moveX
    const newY = prevY + moveY
    el.style.transform = `translate(${newX}px, ${newY}px)`

    const opacity = Math.max(0, Math.min(1, dist / 300))
    el.style.opacity = `${opacity}`
  })
  if (pulling.value) setTimeout(pull, 10)
}

function endPull() {
  pulling.value = false
  if (!pullingElements.value) {
    return
  }
  pullingElements.value.forEach((el) => {
    el.style.transition = 'none'
    el.style.transform = 'none'
    el.style.opacity = '1'
    void el.offsetWidth
    el.style.transition = ''
  })
  if(scatteredURLS.value) {
    scatteredURLS.value.forEach((el,i) => {
    el.style.transition = 'none'
    el.style.transform = scatterStyles.value[i].transform
    el.style.opacity = '1'
    void el.offsetWidth
    el.style.transition = ""
  });
  }
}
</script>

<template>
 <div class="void-wrapper">
    <div class="container-404">
      <h1>Drawn Toward a Consuming Void</h1>
      <p>The void draws in all things—sound, memory, and your request.</p>
      <img
        src="https://spiritislandwiki.com/images/0/0a/Draw_Towards_a_Consuming_Void.png"
        ref="voidImage"
        :class="{'img-animation':pulling}"
        @mouseenter="startPull"
        @mouseleave="endPull"
        :key="String(pull)"
      />
      <Button @click="goHome" class="clickable">Go Home</Button>
    </div>

    <p
      v-for="i in numberOfURLS"
      class="scattered-URL"
      ref="scatteredURLS"
      :key="i"
      :style="scatterStyles[i - 1]"
    >
      {{ notFoundPage || "Page not found"}}
    </p>
  </div>
  <Footer />
</template>

<style lang="css" scoped>
.container-404 > *:not(img) {
  position: relative;
  width: fit-content;
  transition-duration: 0.3s;
  pointer-events:none;
  z-index: 2;
}
.void-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
}
.container-404 {
  position: relative;
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 100%;
  z-index: 1;
}
.scattered-URL {
  position: absolute;
  transition: transform 0.3s;
  pointer-events: none;
  white-space: nowrap;
  z-index: 2;
  width:min-content;
  top: 50%;
  left: 50%;
  transform: translate(0, 0); /* overridden by JS */
}
.clickable {
  pointer-events: auto !important;
}

h1 {
  color:var(--p-surface-800);
}
h2,p {
  color:var(--p-surface-700);
}
img {
  transform: scale(1);
}
.img-animation {
  animation: pulse 2s infinite;
}
@keyframes pulse {
    0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(135, 135, 135, 0.7);
    }

    70% {
        transform: scale(1);
        box-shadow: 0 0 0 15px rgba(135, 135, 135, 0);
    }

    100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(135, 135, 135, 0);
    }
} 
</style>
