import request from '@/utils/request'

// 我的所有课程列表
export const queryMyCourseList = (semesterId) => {
    return request({
        method: 'GET',
        url: '/mycourse/queryMyCourseList',
        params: {
            semesterId
        }
    })
}


//我的课程详情
export const queryMyCourseDetail = (selectionId) => {
    return request({
        method: 'GET',
        url: '/mycourse/queryMyCourseDetail',
        params: {
            selectionId
        }
    })
}
