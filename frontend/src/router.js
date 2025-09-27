import { createRouter, createWebHistory } from 'vue-router';
import UserForm from './components/UserForm.vue';
import UserTable from './components/UserTable.vue';
import Login from './views/Login.vue';
const routes = [
    { path: '/login', component: Login },
    { path: '/table', component: UserTable, meta: { requiresAuth: true } },
    { path: '/form', component: UserForm, meta: { requiresAuth: true } },
    { path: '/', redirect: '/login' } // default route goes to login
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (to.meta.requiresAuth && !token) {
        next('/login'); // Redirect unauthenticated users to login
    }
    else if (to.path === '/login' && token) {
        next('/table'); // If already logged in, redirect from login to table
    }
    else {
        next();
    }
});
export default router;
