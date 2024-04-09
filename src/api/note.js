import request from "@/utils/request";

// 笔记列表
export const queryCollectNotes = (semesterId) => {
    return request({
        method: 'GET',
        url: '/note/queryCollectNotes',
        params: {
            semesterId
        }
    })
}

// 笔记目录
export const queryNoteDirectory = (selectionId) => {
    return request({
        method: 'GET',
        url: '/resource/queryNoteDirectory',
        params: {
            selectionId
        }
    })
}

// 章节笔记
export const queryAllNoteList = (passageId, selectionId) => {
    return request({
        method: 'GET',
        url: '/note/queryAllNoteList',
        params: {
            passageId,
            selectionId
        }
    })
}

// 添加笔记
export const insertNote = (data) => {
    return request({
        method: 'POST',
        url: '/note/insertNote',
        data
    })
}
