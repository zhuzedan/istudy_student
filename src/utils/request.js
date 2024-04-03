import axios from 'axios';

const request = axios.create({
    baseURL: process.env.VUE_APP_API_URL + process.env.VUE_APP_BASE_API, // 组合API基础URL
    // 其他 Axios 配置（如 timeout、headers 等）
    // timeout: 10000
});

// 请求拦截器：添加请求头、处理身份验证等通用逻辑
request.interceptors.request.use(
    (config) => {

        // 示例：若需添加全局请求头（如 JWT token）
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // 对请求错误进行处理
        console.error('Request Error:', error);
        Promise.reject(error);
    }
);

// 响应拦截器：处理错误码、统一数据格式等
request.interceptors.response.use(
    (response) => {
        // 对响应数据进行处理，如：统一提取 data 字段
        const {data} = response;

        return data;
    },
    (error) => {
        // 对响应错误进行处理，如：提示友好错误信息、重试等
        if (error.response) {
            console.error('Response Error:', error.response.status, error.response.data);
        } else {
            console.error('Network Error:', error.message);
        }

        return Promise.reject(error);
    }
);

export default request;
