<template>
<main :class="{ 'opacity-0': fadingOut }" class="bg-white md:flex transition-opacity duration-500">
    <div class="md:w-1/2">
      <img
        src="../assets/images/home-img.jpg"
        alt="Home"
        class="w-full h-auto max-h-[400px] object-cover md:h-screen md:max-h-[1024px] lg:max-h-[600px] xl:max-h-[800px] 2xl:max-h-[900px]"
      />
    </div>
    <div class="pt-6 pl-6 pr-6 pb-24 md:w-1/2">
      <div class="flex justify-center items-center">
        <img
          ref="logoRef"
          src="../assets/logo/limesharp-logo.svg"
          alt="Limesharp"
          class="w-full"
        />
      </div>
      <div ref="rightContent" class="mt-24">
        <div class="text-sans-large text-text text-center font-normal font-primary leading-[26px]">
        Redefining the future of
      </div>
      <div class="text-serif-large text-text text-center font-normal italic font-secondary leading-[26px] mb-12">
        Digital Commerce
      </div>
        <ProjectList />
      </div>
      <div ref="linkRef" class="mt-[42px] text-center">
        <AnimatedLink to="#" class="animated-underline text-sans-large font-primary font-normal text-text leading-[26px]">
          Get in Touch
        </AnimatedLink>
      </div>
    </div>
</main>
</template>

<script setup lang="ts">
import ProjectList from '../components/ProjectList.vue';
import { ref, provide, onMounted, inject } from 'vue';
import type { Ref } from 'vue';
import gsap from 'gsap';
import AnimatedLink from '../components/AnimatedLink.vue';


const fadingOut = ref(false);
const logoRef = ref<HTMLElement | null>(null);
const rightContent = ref<HTMLElement | null>(null);
const linkRef = ref<HTMLElement | null>(null);
const heroLayer = inject<Ref<{ reset: () => void }> | undefined>('heroLayer');
provide('homeFadeOut', fadingOut);

const runHomeEnterAnimation = () => {
  fadingOut.value = false;
  heroLayer?.value?.reset?.();

  gsap.from([logoRef.value, rightContent.value, linkRef.value], {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    stagger: 0.25,
  });
};


onMounted(() => {
  runHomeEnterAnimation();
});
</script>

<style scoped>
.animated-underline {
  position: relative;
  display: inline-block;
  cursor: pointer;
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
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1);
}

.animated-underline:hover::after {
  transform: scaleX(0);
}
</style>