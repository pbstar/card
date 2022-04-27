import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login'
import User from '../views/user'
import Store from '../views/store'
import Detail from '../views/detail'
import Order from '../views/order'
import UserHome from '../views/user/home'
import UserUpPass from '../views/user/upPass'
import UserLower from '../views/user/lower'
import UserLevel from '../views/user/level'
import UserGoods from '../views/user/goods'
import UserEarnings from '../views/user/earnings'
import UserOrder from '../views/user/order'
import UserAddLower from '../views/user/addlower'
import UserAdmin from '../views/admin'
import UserAdminAddgoods from '../views/admin/addgoods'

const routes = [
    {
        path: '',
        redirect: '/user/home',
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
        path: '/user',
        name: 'User',
        component: User,
        redirect: '/user/home',
        children: [{
            path: 'home',
            name: 'UserHome',
            component: UserHome
        }, {
            path: 'upPass',
            name: 'UserUpPass',
            component: UserUpPass
        }, {
            path: 'order',
            name: 'UserOrder',
            component: UserOrder
        }, {
            path: 'earnings',
            name: 'UserEarnings',
            component: UserEarnings
        }, {
            path: 'goods',
            name: 'UserGoods',
            component: UserGoods
        }, {
            path: 'level',
            name: 'UserLevel',
            component: UserLevel
        }, {
            path: 'lower',
            name: 'UserLower',
            component: UserLower
        }, {
            path: 'addlower',
            name: 'UserAddLower',
            component: UserAddLower
        }, {
            path: 'admin',
            name: 'UserAdmin',
            component: UserAdmin
        }, {
            path: 'adminaddgoods',
            name: 'UserAdminAddgoods',
            component: UserAdminAddgoods
        }]
    }, {
        path: '/:pathMatch(.*)*',
        redirect: '/user/home',
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
