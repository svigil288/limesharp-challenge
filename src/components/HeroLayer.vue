<template>
  <img v-if="visible" :src="src" :style="style" class="hero-image" />
</template>

<script setup>
import { ref, nextTick } from 'vue';

const visible = ref(false);
const style = ref({});
const src = ref('');

const showHero = ({ top, left, width, height, imageUrl, sourceElement }) => {
  return new Promise((resolve) => {
    src.value = imageUrl;

    style.value = {
      position: 'fixed',
      top: `${top}px`,
      left: `${left}px`,
      width: `${width}px`,
      height: `${height}px`,
      zIndex: 9999,
      pointerEvents: 'none',
      visibility: 'visible',
    };

    if (sourceElement) {
      const computed = window.getComputedStyle(sourceElement);
      style.value.objectFit = computed.objectFit || 'cover';
      style.value.borderRadius = computed.borderRadius || '0px';
      style.value.aspectRatio = computed.aspectRatio || '';
      style.value.boxSizing = computed.boxSizing || 'border-box';
      style.value.transform = computed.transform || 'none';
    }

    visible.value = true;

    nextTick().then(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          resolve();
        });
      });
    });
  });
};

const hideHero = () => {
  if (!visible.value) return;
  src.value = '';
  style.value = {};
};

const reset = () => {
  hideHero();
};

defineExpose({ showHero, hideHero, reset });
</script>
