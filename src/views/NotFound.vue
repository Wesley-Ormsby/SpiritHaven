<script setup lang="ts">
import Footer from '@/components/Footer.vue'
import Button from 'primevue/button'
import router from '@/router'
function goHome() {
  router.push('/')
}
</script>

<template>
    <div class="container-404">
      <h1 class="title">Drawn Toward a Consuming Void</h1>
      <p><span class="primary">404</span>: The void draws in all things—sound, memory, and your request.</p>
      <img
        src="https://res.cloudinary.com/du1bjnkar/image/upload/v1756739189/powers/draw_towards_a_consuming_void.png"
        alt="Consuming Void"
      />
      <Button @click="goHome" class="clickable">Go Home</Button>
    </div>
  <Footer />
</template>

<style lang="css" scoped>
.container-404 {
  display:flex;
  flex-direction: column;
  gap:20px;
  align-items: center;
  margin-top:70px;
  padding:40px;

}
h1 {
  margin-bottom: 0px;
}
p {
  text-align: center;
  margin-top:0px;
  font-size: 24px;
  padding:0px 20px;
  color:var(--p-surface-700);
}
img {
  max-width:80vw;
}
</style>
