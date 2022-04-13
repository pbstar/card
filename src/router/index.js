import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login'
import Admin from '../views/admin'
import AdminHome from '../views/admin/home'

const routes = [
    {
        path: '',
        redirect: '/admin/home',
    }, {
        path: '/login',
        name: 'Login',
        component: Login
    }, {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        redirect: '/admin/home',
        children: [{
            path: 'home',
            name: 'AdminHome',
            component: AdminHome
        }]
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
