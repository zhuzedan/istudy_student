import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout/BasicLayout.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'index',
        component: Layout,
        meta: {
            requireAuth: true
        },
        children: [
            {
                path: '',
                name: 'index',
                component: () => import("@/views/index/Index.vue"),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'myCourses',
                name: 'myCourse',
                component: () => import("@/views/course/MyCourse.vue"),
                meta: {
                    requireAuth: true
                }
            }]
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
