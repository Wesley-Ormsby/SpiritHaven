<script lang="ts" setup>
import { SYMBOL_DATA } from '@/scripts/data';
import type { CustomSymbol } from '@/scripts/utils/symbols';

const {data} = defineProps<{ data: CustomSymbol|null }>()

// <CustomSymbol :data="{type:'Card Plays',text:9}"></CustomSymbol>
const emptyEnergy = "https://res.cloudinary.com/du1bjnkar/image/upload/v1758042216/100px-Blankenergy_wbmiwi.png"
</script>
<template>

  <span v-if="data && data.type == 'Card Plays'" class="symbol card-plays">
    <img src="https://res.cloudinary.com/du1bjnkar/image/upload/v1757967883/Cardplay_iyi8jo.png"></img>
    <span class="center-over-relative">{{ data.plays }}</span>
  </span>

  <span v-if="data && data.type == 'Energy Card Plays'" class="symbol energy-card-plays">
    <span class="top"><CustomSymbol :data="{type:'Energy',energy:data.energy}"/></span>
    <span class="bottom"><CustomSymbol  :data="{type:'Card Plays',plays:data.plays}"/></span>
  </span>

  <span v-if="data && data.type == 'Energy Element'" class="symbol">
    <img class='energy-background' :src="emptyEnergy"></img>
    <img class='center-over-relative large-element' :src="SYMBOL_DATA[data.element]">
  </span>

  <span v-if="data && data.type == 'Energy Double Element'" class="symbol double-element">
    <img class='energy-background' :src="emptyEnergy"></img>
    <img class='top' :src="SYMBOL_DATA[data.top]">
    <img class='bottom' :src="SYMBOL_DATA[data.bottom]">
  </span>

  <span v-if="data && data.type == 'Energy'" class="symbol">
    <img class='energy-background' :src="emptyEnergy"></img>
    <span class="center-over-relative">{{ data.energy }}</span>
  </span>

  <span v-if="data && data.type == 'Gain Energy'" class="symbol">
    <img class='energy-background' :src="emptyEnergy"></img>
    <span class="center-over-relative smaller-text">+{{ data.energy }}</span>
  </span>

  <span v-if="data && data.type == 'Pay Energy'" class="symbol">
    <img class='energy-background' :src="emptyEnergy"></img>
    <span class="center-over-relative">-{{ data.energy }}</span>
  </span>
</template>
<style scoped>
    .symbol {
        position:relative;
        max-height:24px;
        max-width:24px;
        display:inline-flex;
        align-items: center;
        justify-content: center;
        font-family: DK;
    }
    .center-over-relative {
        position:absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .large-element {
      width:12px;
    }
    span {
        color: black;
        font-size:13px;  
    }
    .smaller-text {
      font-size: 11px;
    }
    /* Card Plays */
    .card-plays img {
        height: 19.5px;
        width:auto;
        object-fit: contain;
    }
    .card-plays span {
      font-weight: bold;
    }
    /* Energy Card Plays */ 
    .energy-card-plays {
      width:24px;
      position: relative;
    }
    .energy-card-plays .top {
      transform: scale(0.7);
      position: absolute;
      top:-3px;
      left:-3px;
    }
    .energy-card-plays .bottom {
      z-index: 2;
      position: absolute;
      bottom:-4px;
      right:-1px;
      transform: scale(0.6);
    }
    /* Energy Elements */
    .energy-background {
        height: 24px;
        width:auto;
        object-fit: contain;
    }
    .energy-background .element {
      width:20px;
    }

    /* Energy Double Elements */
    .double-element .top,  .double-element .bottom{
      width:11px;
      position: absolute;
    }
    .double-element .top {
      z-index: 2;
      top: 4px;
      left: 4px;
    }
    .double-element .bottom {
      bottom: 4px;
      right: 4px;
    }
</style>
