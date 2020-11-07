import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/room',
    name: 'Room',
    meta: { requireAuth: true },
    component: () => import('@/views/Room.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
