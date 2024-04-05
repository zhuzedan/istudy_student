import request from '@/utils/request'

// 首页课程
export const queryOpenCourseList = (courseCategoryId) => {
    return request({
        method: 'GET',
        url: '/index/queryOpenCourseList',
        params: {
            courseCategoryId
        }
    })
}

// 课程详情
export const queryOpenCourseComment = (scheduleId) => {
    return request({
        method: 'GET',
        url: '/index/queryOpenCourseComment',
        params: {
            scheduleId
        }
    })
}

// 课程大纲
export const queryPassageList = (scheduleId) => {
    return request(({
        method: 'GET',
        url: '/index/queryPassageList',
        params: {
            scheduleId
        }
    }))
}

// 课程评论
export const queryOpenCourseDetail = (scheduleId) => {
    return request({
        method: 'GET',
        url: '/index/queryOpenCourseDetail',
        params: {
            scheduleId
        }
    })
}

// 首页课程类别
export const queryOpenCourseCategory = () => {
    return request({
        method: 'GET',
        url: '/index/queryOpenCourseCategory'
    })
}

// 热门课程
export const queryOpenCourseListTop10 = () => {
    return request({
        method: 'GET',
        url: '/index/queryOpenCourseListTop10'
    })
}
