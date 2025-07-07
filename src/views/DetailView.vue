<template>
  <main class="h-screen flex flex-col md:flex-row" aria-label="Project detail view">
    
    <img
      v-if="project"
      ref="imgDetail"
      :src="getImageUrl(project.image)"
      :alt="project.name"
      :data-project-image="project.id"
      class="w-full h-[400px] object-cover md:w-1/2 md:h-full"
    />

    <div
      class="flex-1 p-6 md:px-16 md:pt-24 md:flex md:flex-col md:justify-center lg:px-24"
      :class="{ 'invisible': !contentVisible }"
    >
      <template v-if="project">
        <div class="flex flex-col justify-between h-full">
          <div class="flex flex-col items-stretch">
            <h1
              ref="titleRef"
              class="text-heading font-primary font-normal text-text text-center leading-[70px] w-full"
            >
              {{ project.name }}
            </h1>
            <span
              ref="dateRef"
              class="text-serif-large font-secondary italic text-text text-center leading-[26px] w-full"
            >
              {{ project.date }}
            </span>
          </div>
          <div class="flex w-full">
            <p
              ref="descriptionRef"
              class="text-sans-large font-primary font-normal text-text text-center leading-[26px] w-full"
            >
              {{ project.description }}
            </p>
          </div>
          <div class="flex w-full justify-center">
            <AnimatedLink
              :to="{ name: 'home' }"
              class="text-sans-large font-primary font-normal text-text leading-[26px]"
            >
              Go Back
            </AnimatedLink>
          </div>
        </div>
      </template>
    </div>
</main>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick} from 'vue';
import { useRoute } from 'vue-router';
import { useApi } from '../composables/useApi';
import type { Project } from '../types';
import gsap from 'gsap';
import { getImageUrl } from '../utils';
import router from '../router';
import AnimatedLink from '../components/AnimatedLink.vue';

const { fetchProjectById } = useApi();
const project = ref<Project | null>(null);
const route = useRoute();
const imgDetail = ref<HTMLElement | null>(null);
const titleRef = ref<HTMLElement | null>(null);
const dateRef = ref<HTMLElement | null>(null);
const descriptionRef = ref<HTMLElement | null>(null);
const contentVisible = ref<boolean>(false);


const fetchAndSetProject = async () => {
  const projectId = route.params.id as string;
  const numericId = parseInt(projectId, 10);
  if (isNaN(numericId)) return false;

  const fetched = await fetchProjectById(numericId);
  if (!fetched) return false;

  project.value = fetched;
  await nextTick();
  return true;
};

const runHeroTransition = () => {
  const heroImageEl = document.querySelector('.hero-image') as HTMLElement;
  const imageDetailEl = imgDetail.value;
  if (!heroImageEl || !imageDetailEl) {
    router.replace({ name: 'home' });
    return;
  };

  imageDetailEl.style.visibility = 'hidden';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const targetRect = imageDetailEl.getBoundingClientRect();

      gsap.to(heroImageEl, {
        top: targetRect.top,
        left: targetRect.left,
        width: targetRect.width,
        height: targetRect.height,
        duration: 0.7,
        ease: 'power3.inOut',
        onComplete: () => {
          imageDetailEl.style.visibility = 'visible';
          contentVisible.value = true;
          gsap.from([titleRef.value, dateRef.value, descriptionRef.value], {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            stagger: 0.15,
          });
          heroImageEl.style.visibility = 'hidden';
        }
      });
    });
  });
};

onMounted(async () => {
  const ok = await fetchAndSetProject();
  if (ok) runHeroTransition();
});

</script>
