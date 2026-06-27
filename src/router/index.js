import { createRouter, createWebHistory } from 'vue-router';
import { accountExists } from '../composables/useAppState';

const routes = [
  { path: '/', name: 'home', component: () => import('../views/Home.vue'), meta: { public: true } },
  { path: '/courses', name: 'courses', component: () => import('../views/Courses.vue') },
  { path: '/courses/:id', name: 'course-detail', component: () => import('../views/CourseDetail.vue'), props: true },
  { path: '/login', name: 'login', component: () => import('../views/Login.vue'), meta: { public: true } },
  { path: '/register', name: 'register', component: () => import('../views/Register.vue'), meta: { public: true } },
  { path: '/dashboard', name: 'dashboard', component: () => import('../views/Dashboard.vue') },
  { path: '/my-courses', name: 'my-courses', component: () => import('../views/MyCourses.vue') },
  { path: '/learning/:id?', name: 'learning', component: () => import('../views/Learning.vue'), props: true },
  { path: '/quiz/:id?', name: 'quiz', component: () => import('../views/Quiz.vue'), props: true },
  { path: '/assignment', name: 'assignment', component: () => import('../views/Assignment.vue') },
  { path: '/certificates', name: 'certificates', component: () => import('../views/Certificates.vue') },
  { path: '/profile', name: 'profile', component: () => import('../views/Profile.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

router.beforeEach((to) => {
  if (to.meta.public) {
    return true;
  }

  if (accountExists()) {
    return true;
  }

  return {
    name: 'register',
    query: {
      redirect: to.fullPath,
      reason: 'account-required'
    }
  };
});

export default router;
