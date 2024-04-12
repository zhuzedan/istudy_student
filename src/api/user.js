import request from '@/utils/request'

// 手机号登录
export const loginTel = (formData) => {
    return request({
        method: 'POST',
        url: '/user/loginTel',
        data: formData
    })
}

// 学号登录
export const loginSchool = (data) => {
    return request({
        method: 'POST',
        url: '/user/login',
        data
    })
}


// 个人信息
export const queryUserInfo = () => {
    return request({
        method: 'GET',
        url: '/user/queryUserInfo'
    })
}

// 修改个人信息
export const updateUserInfo = (data) => {
    return request({
        method: 'PUT',
        url: '/user/updateUserInfo',
        data: data
    })
}

// 修改密码
export const updatePassword = (data) => {
    return request({
        method: 'PUT',
        url: '/user/updatePwd',
        data
    })
}

// 个人中心课程列表
export const queryCourseBySemester = (semesterId) => {
    return request({
        method: 'GET',
        url: '/mylearn/queryCourseBySemester',
        params: {
            semesterId
        }
    })
}

// 课程总体进度
export const queryCourseProgress = (semesterId) => {
    return request({
        method: 'GET',
        url: '/mylearn/queryCourseProgress',
        params: {
            semesterId
        }
    })
}

// 课程综合评价
export const queryCourseEvaluate = (semesterId) => {
    return request({
        method: 'GET',
        url: '/mylearn/queryCourseEvaluate',
        params: {
            semesterId
        }
    })
}

// 课程星级分析
export const queryCourseStar = (selectionId) => {
    return request({
        method: 'GET',
        url: '/mylearn/queryCourseStar',
        params: {
            selectionId
        }
    })
}

// 上传用户头像
export const updateAvatar = (data) => {
    return request({
        method: 'POST',
        url: '/oss/upload/courseCover',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}
