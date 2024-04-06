import request from '@/utils/request'

// 手机号登录
export const loginTel = (formData) => {
    return request({
        method: 'POST',
        url: '/user/loginTel',
        data: formData
    })
}

// 个人信息
export const queryUserInfo = () => {
    return request({
        method: 'GET',
        url: '/user/queryUserInfo'
    })
}

// 个人中心课程列表
export  const queryCourseBySemester = (semesterId) => {
    return request({
        method: 'GET',
        url: '/user/queryCourseBySemester',
        params: {
            semesterId
        }
    })
}

// 课程总体进度
export const queryCourseProgress = () => {
    return request({
        method: 'GET',
        url: '/user/queryCourseProgress'
    })
}

// 课程综合评价
export const queryCourseEvaluate = () => {
    return request({
        method: 'GET',
        url: '/user/queryCourseEvaluate'
    })
}
