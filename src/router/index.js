import { createRouter, createWebHistory } from 'vue-router'

const modules = import.meta.glob('../modules/**/index.js', { eager: true })

const moduleRoutes = []

for (const path in modules) {
  const mod = modules[path].default
  if (mod.routes) {
    moduleRoutes.push(...mod.routes)
  }
}

const routes = [
  {
    path: '/',
    name: '',
    component: () => import('@/layouts/defaultLayout.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/layouts/notFoundLayout.vue'),
  },
  ...moduleRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
