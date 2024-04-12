import request from "@/utils/request";

// 错题本列表
export const queryCollectWrongs = (semesterId) => {
    return request({
        method: 'GET',
        url: '/wrong/queryCollectWrongs',
        params: {
            semesterId
        }
    })
}

// 章节错题
export const queryAllWrongList = (passageId, selectionId) => {
    return request({
        method: 'GET',
        url: '/wrong/queryAllWrongList',
        params: {
            passageId,
            selectionId
        }
    })
}

// 错题详情
export const queryWrongDetail = (wrongId) => {
    return request({
        method: 'GET',
        url: '/wrong/queryWrongDetail',
        params: {
            wrongId
        }
    })
}

//错题讨论
export const queryQuestionDiscuss = (questionId, wrongId) => {
    return request({
        method: 'GET',
        url: '/wrong/queryQuestionDiscuss',
        params: {
            questionId,
            wrongId
        }
    })
}

//添加错题讨论
export const insertQuestionDiscuss = (discussContent, questionId, wrongId) => {
    return request({
        method: 'POST',
        url: '/wrong/insertQuestionDiscuss',
        data: {
            discussContent,
            questionId,
            wrongId
        }
    })
}
