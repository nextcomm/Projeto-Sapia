import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '@/components/LoginForm.vue';
import DashboardSapia from '@/views/DashboardSapia.vue';
import MinhasConsultas from '@/components/MinhasConsultas.vue';

const routes = [
  {
    path: '/login',
    name: 'LoginForm',
    component: LoginForm
  },
  {
    path: '/dashboard',
    name: 'DashboardSapia',
    component: DashboardSapia,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/minhas-consultas',
    name: 'MinhasConsultas',
    component: MinhasConsultas,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*', // Rota coringa
    redirect: '/login'
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user_name');
  
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
