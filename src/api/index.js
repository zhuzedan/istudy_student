import request from '@/utils/request'

// 首页课程
export const queryOpenCourseList = () => {
    return request({
        method: 'GET',
        url: '/index/queryOpenCourseList'
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
