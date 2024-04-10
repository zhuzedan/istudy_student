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

//课程公告
export const queryRemindList = (fromUid, selectionId) => {
    return request({
        method: 'GET',
        url: '/mycourse/queryRemindList',
        params: {
            fromUid,
            selectionId
        }
    })
}

//课件
export const queryCourseProgress = (selectionId) => {
    return request({
        method: 'GET',
        url: '/mycourse/queryMyCourseProgress',
        params: {
            selectionId
        }
    })
}

//最新笔记
export const queryNewNoteList = (selectionId) => {
    return request({
        method: 'GET',
        url: '/note/queryNewNoteList',
        params: {
            selectionId
        }
    })
}

//最新错题
export const queryNewWrongList = (selectionId) => {
    return request({
        method: 'GET',
        url: '/wrong/queryNewWrongList',
        params: {
            selectionId
        }
    })
}

//视频目录
export const queryVideoDirectory = (selectionId) => {
    return request({
        method: 'GET',
        url: '/resource/queryVideoDirectory',
        params: {
            selectionId
        }
    })
}

//视频详情
export const queryVideoDetail = (videoId) => {
    return request({
        method: 'GET',
        url: '/resource/queryVideoDetail',
        params: {
            videoId
        }
    })
}
