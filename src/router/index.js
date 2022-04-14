import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login'
import Admin from '../views/admin'
import Store from '../views/store'
import Detail from '../views/detail'
import Order from '../views/order'
import AdminHome from '../views/admin/home'
import AdminUpPass from '../views/admin/upPass'
import AdminLower from '../views/admin/lower'
import AdminLevel from '../views/admin/level'
import AdminGoods from '../views/admin/goods'
import AdminEarnings from '../views/admin/earnings'
import AdminOrder from '../views/admin/order'

const routes = [
    {
        path: '',
        redirect: '/admin/home',
    }, {
        path: '/login',
        name: 'Login',
        component: Login
    }, {
        path: '/store',
        name: 'Store',
        component: Store
    }, {
        path: '/detail',
        name: 'Detail',
        component: Detail
    }, {
        path: '/order',
        name: 'Order',
        component: Order
    }, {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        redirect: '/admin/home',
        children: [{
            path: 'home',
            name: 'AdminHome',
            component: AdminHome
        }, {
            path: 'upPass',
            name: 'AdminUpPass',
            component: AdminUpPass
        }, {
            path: 'order',
            name: 'AdminOrder',
            component: AdminOrder
        }, {
            path: 'earnings',
            name: 'AdminEarnings',
            component: AdminEarnings
        }, {
            path: 'goods',
            name: 'AdminGoods',
            component: AdminGoods
        }, {
            path: 'level',
            name: 'AdminLevel',
            component: AdminLevel
        }, {
            path: 'lower',
            name: 'AdminLower',
            component: AdminLower
        },]
    }, {
        path: '/:pathMatch(.*)*',
        redirect: '/admin/home',
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
