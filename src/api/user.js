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
