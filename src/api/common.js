import request from '@/utils/request'

// 学年学期列表
export const querySemester = () => {
    return request({
        method: 'GET',
        url: '/common/querySemester',
    })
}
