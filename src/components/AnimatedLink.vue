<template>
  <router-link
    :to="to"
    class="animated-underline"
    v-bind="$attrs"
  >
    <slot />
  </router-link>
</template>

<script setup lang="ts">
defineProps<{ to: string | Record<string, any> }>();
</script>

<style scoped>
.animated-underline {
  position: relative;
  display: inline-block;
  cursor: pointer;
  text-decoration: none;
}
.animated-underline::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  width: 100%;
  background: currentColor;
  transform: scaleX(1);
  transform-origin: right;
  will-change: transform;
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1);
}
.animated-underline:hover::after {
  transform: scaleX(0);
}</style>