import { guestGuard } from '@/middlewares'
export const routes = [
  {
    path: '/auth',
    name: 'auth',
    component: () => import('./authModule.vue'),
    beforeEnter: [guestGuard],
    redirect: { name: 'auth-login' },
    children: [
      {
        path: 'register',
        name: 'auth-register',
        component: () => import('./pages/registerPage.vue'),
      },
      {
        path: 'login',
        name: 'auth-login',
        component: () => import('./pages/loginPage.vue'),
      },
    ],
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('./pages/logoutPage.vue'),
  },
]
