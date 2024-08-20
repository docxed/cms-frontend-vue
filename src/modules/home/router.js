import { authGuard } from '@/middlewares'
export const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('./homeModule.vue'),
    beforeEnter: [authGuard],
    children: [],
  },
]
