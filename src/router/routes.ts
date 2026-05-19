import ProjectsList from '@/components/projects-list.vue';
import ProjectEarth from '@/projects/earth/ProjectEarth.vue';
import ProjectGalaxyGenerator from '@/projects/galaxy-generator/ProjectGalaxyGenerator.vue';
import { ROUTE_NAMES } from '@/router/route-names.ts';
import { createRouter, createWebHashHistory } from 'vue-router';
import ProjectRoom from '../projects/room/ProjectRoom.vue';

const routes = [
  {
    name: ROUTE_NAMES.PROJECTS_LIST,
    path: '/',
    component: ProjectsList
  },
  {
    name: ROUTE_NAMES.PROJECT_EARTH,
    path: '/earth',
    component: ProjectEarth,
  },
  {
    name: ROUTE_NAMES.PROJECT_GALAXY_GENERATOR,
    path: '/galaxy-generator',
    component: ProjectGalaxyGenerator,
  },
  {
    name: ROUTE_NAMES.PROJECT_ROOM,
    path: '/room',
    component: ProjectRoom,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
