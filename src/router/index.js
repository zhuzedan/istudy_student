import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout/BasicLayout.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
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
                path: '/introduction',
                name: 'introduction',
                component: () => import("@/views/index/CourseIntroduction.vue"),
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
            },
            {
                path: 'courseDetail',
                name: 'courseDetail',
                component: () => import("@/views/course/CourseDetail.vue"),
                meta: {
                    requireAuth: true
                },
                children: [
                    {
                        path: '',
                        name: 'courseOperation',
                        component: () => import("@/views/course/CourseOperation.vue"),
                        meta: {
                            requireAuth: true
                        }
                    },
                    {
                        path: 'videoCourse',
                        name: 'videoCourse',
                        component: () => import("@/views/course/VideoCourse.vue"),
                        meta: {
                            requireAuth: true
                        }
                    },
                    {
                        path: 'homework',
                        name: 'homework',
                        component: () => import("@/views/course/HomeWork.vue"),
                        meta: {
                            requireAuth: true
                        }
                    },
                    {
                        path: 'wrongTitle',
                        name: 'wrongTitle',
                        component: () => import("@/views/course/WrongTitle.vue"),
                        meta: {
                            requireAuth: true
                        }
                    },
                    {
                        path: 'recourses',
                        name: 'recourses',
                        component: () => import("@/views/course/Recourse.vue"),
                        meta: {
                            requireAuth: true
                        }
                    }]
            },
            {
                path: 'notebooks',
                name: 'notebooks',
                component: () => import("@/views/note/MyNotes.vue"),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'noteDetail',
                name: 'noteDetail',
                component: () => import("@/views/note/NoteDetail.vue")
            },
            {
                path: 'mistakes',
                name: 'mistakes',
                component: () => import("@/views/mistakes/MistakeNotes.vue"),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'mistakeDetail',
                name: 'mistakeDetail',
                component: () => import("@/views/mistakes/MistakeNoteDetail.vue"),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'mine',
                name: 'mine',
                component: () => import("@/views/mine/Personal.vue"),
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
    mode: 'hash',
    scrollBehavior(to, from, savedPosition) {
        // 滚动到顶部
        return {x: 0, y: 0}
    }
})

//重复点击相同路由报错解决
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}
export default router
