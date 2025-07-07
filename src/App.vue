<template>
  <div class="h-[100dvh] md:h-screen flex flex-col">
  <router-view />
  </div>
  <HeroLayer ref="heroLayer" />
</template>

<script setup lang="ts">
import HeroLayer from './components/HeroLayer.vue';
import { ref, provide } from 'vue';

const heroLayer = ref();
provide('heroLayer', heroLayer); 
</script>
