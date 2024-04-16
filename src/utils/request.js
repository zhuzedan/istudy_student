import axios from 'axios';
import {Loading, Message, MessageBox} from "element-ui";
import router from "@/router";
// 请求动画
let oLoadingAnimation;
// 请求数量
let nNumberOfRequests = 0;
// 请求动画白名单
const aLoadingWhiteList = [
    "/index/queryOpenCourseList",
];

const request = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // 组合API基础URL
    // 其他 Axios 配置（如 timeout、headers 等）
    // timeout: 10000
});

// 请求拦截器：添加请求头、处理身份验证等通用逻辑
request.interceptors.request.use(
    (config) => {

        // 启动全局加载动画，除非在白名单内
        if (aLoadingWhiteList.indexOf(config.url) === -1) {
            startLoading();
        }
        // 若需添加全局请求头
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // 对请求错误进行处理
        Message.error('请求超时');
        return Promise.resolve(error);
    }
);

// 响应拦截器：处理错误码、统一数据格式等
let show401AlertScheduled = false; // 添加一个标志位来判断是否已计划显示401警告

request.interceptors.response.use(
    (response) => {
        // 对响应数据进行处理，如：统一提取 data 字段
        const {data, config} = response;
        // 结束全局加载动画，除非在白名单内
        if (aLoadingWhiteList.indexOf(config.url) === -1) {
            stopLoading();
        }

        // 返回的数据
        if (isResponseSuccess(data)) {
            return data;
        } else {
            // 根据返回的code值来做不同的处理(和后端约定)
            Message.error(data.errMsg);
            return data;
        }
    },
    (error) => {
        // 结束全局加载动画，除非在白名单内
        if (aLoadingWhiteList.indexOf(error.config.url) === -1) {
            stopLoading();
        }
        // console.log('Error details:', error.response.data); // 打印服务器返回的错误详情（如您提供的出参示例）
        // console.log('HTTP Status:', error.response.status); // 打印HTTP状态码
        // console.log('Request Config:', error.config); // 打印请求配置，有助于排查问题

        if (error.response.data.errCode === 401 && !show401AlertScheduled) {
            show401AlertScheduled = true; // 设置标志位为真，表示已计划显示警告
            setTimeout(() => {
                show401AlertScheduled = false; // 一段时间后恢复为假，允许下次触发
                window.localStorage.removeItem('accessToken')
                MessageBox.alert(error.response.data.errMsg, "提示", {
                    confirmButtonText: '确定',
                    callback: action => {
                        router.replace({
                            path: '/login',
                            query: {redirect: router.currentRoute.fullPath}
                        });
                    }
                });
            }, 500); // 这里设置一个延迟时间，例如500毫秒，可以根据实际情况调整
        } else {
            // 对响应错误进行处理，如：提示友好错误信息、重试等
            Message.error(error.response.data.errMsg);
        }
        return Promise.reject(error.response.data);
    }
);

/**
 * 启动全局加载动画
 */
function startLoading() {
    if (nNumberOfRequests === 0) {
        oLoadingAnimation = Loading.service({
            lock: true,
            text: "加载中...",
            background: "#ffffff"
        });
    }
    nNumberOfRequests++;
}

/**
 * 结束全局加载动画
 */
function stopLoading() {
    nNumberOfRequests--;
    if (nNumberOfRequests <= 0) {
        oLoadingAnimation.close();
    }
}

/**
 * 判断响应是否成功
 * @param {Object} response 响应数据
 * @returns {Boolean}
 */
function isResponseSuccess(response) {
    return response && response.success === true;
}

export default request;
