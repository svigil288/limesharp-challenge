<template>
  <div class="mb-6 cursor-pointer">
    <img
      ref="imageRef"
      :src="getImageUrl(project.image)"
      :alt="project.name"
      :data-project-image="project.id"
      @click="(event:any) => onImageClick(event, getImageUrl(project.image))"
      class="w-full h-full max-h-[253px] object-cover md:max-h-[271px] lg:max-h-[168px] xl:max-h-[204px] 2xl:max-h-[267px]
      transition-transform duration-300 ease-in-out hover:scale-102"
    >
    <div class="mt-2 flex justify-between items-center">
      <span class="text-sans-small font-primary font-normal text-text leading-[16px]">{{ project.name }}</span>
      <span class="text-serif-small font-secondary font-normal text-text leading-[16px]">{{ project.date }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';
import type { Project, HeroLayerType } from '../types';
import { getImageUrl } from '../utils';

const props = defineProps<{ project: Project }>();
const imageRef = ref<HTMLElement | null>(null);
const router = useRouter();
const heroLayer = inject<Ref<HeroLayerType> | undefined>('heroLayer');
const fadingOut = inject<Ref<boolean>>('homeFadeOut');

const onImageClick = async (event: MouseEvent, imageUrl: string) => {
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();

  // 1. Create the hero image and wait until it's painted
  if (heroLayer?.value) {
    await heroLayer.value.showHero({
      imageUrl,
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      sourceElement: target
    });
  }

  // 2. Start fading out immediately after clone is rendered
  if (fadingOut) fadingOut.value = true;

  // 3. Route after fade duration
  setTimeout(() => {
    router.push({
      name: 'project-detail',
      params: { id: props.project.id },
    });
  }, 500); // Match with fade-out CSS duration
}
</script>