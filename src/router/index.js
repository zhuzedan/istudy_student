import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout/BasicLayout.vue'
import NProgress from "@/utils/nprogess.js"; //引入进度条插件

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
                    requireAuth: true,
                    title: 'iStudy学生端'
                }
            },
            {
                path: '/introduction',
                name: 'introduction',
                component: () => import("@/views/index/CourseIntroduction.vue"),
                meta: {
                    requireAuth: true,
                    title: '课程介绍'
                }
            },
            {
                path: 'myCourses',
                name: 'myCourse',
                component: () => import("@/views/course/MyCourse.vue"),
                meta: {
                    requireAuth: true,
                    title: '我的课程'
                }
            },
            {
                path: 'courseDetail',
                name: 'courseDetail',
                component: () => import("@/views/course/CourseDetail.vue"),
                meta: {
                    requireAuth: true,
                    title: '课程详情'
                },
                children: [
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
                    requireAuth: true,
                    title: '笔记全集'
                }
            },
            {
                path: 'noteDetail',
                name: 'noteDetail',
                component: () => import("@/views/note/NoteDetail.vue"),
                meta: {
                    title: '笔记详情'
                }
            },
            {
                path: 'mistakes',
                name: 'mistakes',
                component: () => import("@/views/mistakes/MistakeNotes.vue"),
                meta: {
                    requireAuth: true,
                    title: '错题小本'
                }
            },
            {
                path: 'mistakeDetail',
                name: 'mistakeDetail',
                component: () => import("@/views/mistakes/MistakeNoteDetail.vue"),
                meta: {
                    requireAuth: true,
                    title: '错题详情'
                }
            },
            {
                path: 'mine',
                name: 'mine',
                component: () => import("@/views/mine/Personal.vue"),
                meta: {
                    requireAuth: true,
                    title: '个人中心'
                }
            }]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("@/views/login/Login.vue"),
        meta: {
            title: '登录'
        }
    },
    {
        path: '*',
        name: '404',
        component: () => import("@/views/exception/404.vue"),
        meta: {
            title: '页面不见啦'
        }
    }
]

const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        // 滚动到顶部
        return {x: 0, y: 0}
    }
})


//全局前置路由守卫
router.beforeEach((to, from, next) => {
    //页面跳转之前，开启进度条
    NProgress.start()
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
});


// 全局后置路由守卫
router.afterEach((to, from) => {
    //页面跳转之后，关闭启进度条
    NProgress.done();
    window.scrollTo(0, 0);
})

//重复点击相同路由报错解决
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}
export default router
