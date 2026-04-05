import { createWebHashHistory, createRouter } from 'vue-router';
import ProjectsList from '@/components/projects-list.vue';
import {ROUTE_NAMES} from '@/router/route-names.ts';
import ProjectEarth from '@/projects/earth/ProjectEarth.vue';

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
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
}); 