import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const API_BASE_URL = 'https://api.bgm.tv';

// 創建 axios 實例
const interceptor: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'fan-yu/1.0.0 (https://github.com/your-username/fan-yu)',
    },
});

// 請求攔截器
interceptor.interceptors.request.use(
    (config) => {
        // 在請求發送前做一些處理
        console.log('發送請求:', config.method?.toUpperCase(), config.url);

        // 可以在這裡添加認證 token
        // const token = localStorage.getItem('bgm_token');
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }

        return config;
    },
    (error) => {
        console.error('請求錯誤:', error);
        return Promise.reject(error);
    }
);

// 響應攔截器
interceptor.interceptors.response.use(
    (response: AxiosResponse) => {
        // 對響應數據做一些處理
        console.log('收到響應:', response.status, response.config.url);
        return response;
    },
    (error) => {
        // 對響應錯誤做一些處理
        console.error('響應錯誤:', error.response?.status, error.config?.url);

        if (error.response?.status === 401) {
            // 處理未授權錯誤
            console.warn('未授權訪問，可能需要登錄');
            // 可以在這裡處理重新登錄邏輯
        } else if (error.response?.status === 429) {
            // 處理頻率限制
            console.warn('請求頻率過高，請稍後再試');
        } else if (error.response?.status >= 500) {
            // 處理服務器錯誤
            console.error('服務器錯誤，請稍後再試');
        }

        return Promise.reject(error);
    }
);

// 封裝的 API 方法
const bgmApi = {
    get: <T = unknown>(url: string, config?: AxiosRequestConfig) =>
        interceptor.get<T>(url, config).then((response) => response.data),

    post: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
        interceptor.post<T>(url, data, config).then((response) => response.data),

    put: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
        interceptor.put<T>(url, data, config).then((response) => response.data),

    patch: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
        interceptor.patch<T>(url, data, config).then((response) => response.data),

    delete: <T = unknown>(url: string, config?: AxiosRequestConfig) =>
        interceptor.delete<T>(url, config).then((response) => response.data),
};

export default bgmApi;