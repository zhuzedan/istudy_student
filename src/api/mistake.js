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
export const queryAllWrongList = (passageId,selectionId) => {
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
