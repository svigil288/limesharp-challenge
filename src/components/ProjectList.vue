<template>
  <div class="lg:grid lg:grid-cols-2 lg:gap-x-6">
    <div v-for="project in projects" :key="project.id">
      <ProjectCard :project="project" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useApi } from '../composables/useApi';
import type { Project } from '../types';
import ProjectCard from './ProjectCard.vue';

const { fetchAllProjects } = useApi();
const projects = ref<Project[]>([]);

onMounted(async () => {
  projects.value = await fetchAllProjects();
});
</script>
