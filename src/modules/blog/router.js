import { authGuard } from '@/middlewares'
export const routes = [
  {
    path: '/blog',
    name: 'blog',
    component: () => import('./blogModule.vue'),
    beforeEnter: [authGuard],
    children: [
      {
        path: 'simple',
        name: 'blog-simple',
        component: () => import('./pages/SimplePage/simplePage.vue'),
      },
    ],
  },
]
