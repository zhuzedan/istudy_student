import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import("@/views/index/Index.vue")
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("@/views/login/Login.vue"),
    },
    {
        path: '*',
        name: '404',
        component: () => import("@/views/exception/404.vue")
    }
]

const router = new VueRouter({
    routes,
    mode: 'hash'
})

export default router
