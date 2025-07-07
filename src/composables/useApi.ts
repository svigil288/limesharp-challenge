import { ref } from 'vue';
import projectsData from '../data/projects.json';
import type { Project } from '../types';

const projects = ref<Project[]>(projectsData);

// Simulate API delay
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const useApi = () => {
  const fetchAllProjects = async (): Promise<Project[]> => {
    await sleep(50);
    return projects.value;
  };

  const fetchProjectById = async (id: number): Promise<Project | undefined> => {
    await sleep(50);
    return projects.value.find(p => p.id === id);
  };

  return {
    fetchAllProjects,
    fetchProjectById,
  };
};
