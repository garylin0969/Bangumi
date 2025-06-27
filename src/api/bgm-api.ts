// Bangumi API 基礎配置 - Bangumi API Base Configuration
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// API 基礎配置 - API Base Configuration
const API_BASE_URL = 'https://api.bgm.tv';
const API_TIMEOUT = 10000; // 10秒超時 - 10 seconds timeout
const API_USER_AGENT = 'fan-yu/1.0.0 (https://github.com/your-username/fan-yu)';

/**
 * 創建 Axios 實例 - Create Axios Instance
 * 配置基礎 URL、超時時間和默認請求頭
 * Configure base URL, timeout and default headers
 */
const interceptor: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
        'User-Agent': API_USER_AGENT,
        Accept: 'application/json',
    },
});

// ========== 請求攔截器 - Request Interceptor ==========

interceptor.interceptors.request.use(
    (config) => {
        // 在請求發送前做一些處理 - Do some processing before sending the request
        console.log(`🚀 發送請求 - Sending Request: ${config.method?.toUpperCase()} ${config.url}`);

        // 添加認證 token (如果有) - Add authentication token (if available)
        const token = localStorage.getItem('bgm_access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // 添加請求時間戳 - Add request timestamp
        config.metadata = { startTime: new Date() };

        // 處理請求參數 - Process request parameters
        if (config.params) {
            // 移除空值參數 - Remove empty parameters
            Object.keys(config.params).forEach((key) => {
                if (config.params[key] === null || config.params[key] === undefined || config.params[key] === '') {
                    delete config.params[key];
                }
            });
        }

        return config;
    },
    (error) => {
        console.error('❌ 請求錯誤 - Request Error:', error);
        return Promise.reject(error);
    }
);

// ========== 響應攔截器 - Response Interceptor ==========

interceptor.interceptors.response.use(
    (response: AxiosResponse) => {
        // 對響應數據做一些處理 - Do some processing on response data
        const endTime = new Date();
        const startTime = response.config.metadata?.startTime;
        const duration = startTime ? endTime.getTime() - startTime.getTime() : 0;

        console.log(`✅ 收到響應 - Received Response: ${response.status} ${response.config.url} (${duration}ms)`);

        // 處理成功響應 - Handle successful response
        if (response.status >= 200 && response.status < 300) {
            return response;
        }

        return response;
    },
    (error) => {
        // 對響應錯誤做一些處理 - Handle response errors
        const config = error.config;
        const response = error.response;

        console.error(`❌ 響應錯誤 - Response Error: ${response?.status || 'No Status'} ${config?.url || 'No URL'}`);

        // 根據錯誤狀態碼進行處理 - Handle based on error status code
        if (response?.status === 401) {
            // 處理未授權錯誤 - Handle unauthorized error
            console.warn('🔐 未授權訪問，需要登錄 - Unauthorized access, login required');

            // 清除無效的 token - Clear invalid token
            localStorage.removeItem('bgm_access_token');

            // 可以在這裡觸發重新登錄流程 - Can trigger re-login process here
            // window.location.href = '/login';
        } else if (response?.status === 403) {
            // 處理禁止訪問錯誤 - Handle forbidden error
            console.warn('🚫 禁止訪問 - Access forbidden');
        } else if (response?.status === 404) {
            // 處理資源不存在錯誤 - Handle resource not found error
            console.warn('🔍 資源不存在 - Resource not found');
        } else if (response?.status === 429) {
            // 處理頻率限制錯誤 - Handle rate limit error
            console.warn('⏱️ 請求頻率過高，請稍後再試 - Request rate too high, please try again later');

            // 獲取重試時間 - Get retry time
            const retryAfter = response.headers['retry-after'];
            if (retryAfter) {
                console.log(`⏰ 建議等待 ${retryAfter} 秒後重試 - Suggested wait ${retryAfter} seconds before retry`);
            }
        } else if (response?.status >= 500) {
            // 處理服務器錯誤 - Handle server errors
            console.error('🛠️ 服務器錯誤，請稍後再試 - Server error, please try again later');
        } else if (!response) {
            // 處理網絡錯誤 - Handle network errors
            console.error('🌐 網絡錯誤，請檢查網絡連接 - Network error, please check network connection');
        }

        return Promise.reject(error);
    }
);

// ========== API 方法封裝 - API Method Wrapper ==========

/**
 * Bangumi API 封裝對象 - Bangumi API Wrapper Object
 * 提供便捷的 HTTP 方法調用 - Provides convenient HTTP method calls
 */
const bgmApi = {
    /**
     * GET 請求 - GET Request
     * @param url 請求 URL - Request URL
     * @param config 請求配置 - Request configuration
     * @returns Promise<T> 響應數據 - Response data
     */
    get: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> =>
        interceptor.get<T>(url, config).then((response) => response.data),

    /**
     * POST 請求 - POST Request
     * @param url 請求 URL - Request URL
     * @param data 請求數據 - Request data
     * @param config 請求配置 - Request configuration
     * @returns Promise<T> 響應數據 - Response data
     */
    post: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
        interceptor.post<T>(url, data, config).then((response) => response.data),

    /**
     * PUT 請求 - PUT Request
     * @param url 請求 URL - Request URL
     * @param data 請求數據 - Request data
     * @param config 請求配置 - Request configuration
     * @returns Promise<T> 響應數據 - Response data
     */
    put: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
        interceptor.put<T>(url, data, config).then((response) => response.data),

    /**
     * PATCH 請求 - PATCH Request
     * @param url 請求 URL - Request URL
     * @param data 請求數據 - Request data
     * @param config 請求配置 - Request configuration
     * @returns Promise<T> 響應數據 - Response data
     */
    patch: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
        interceptor.patch<T>(url, data, config).then((response) => response.data),

    /**
     * DELETE 請求 - DELETE Request
     * @param url 請求 URL - Request URL
     * @param config 請求配置 - Request configuration
     * @returns Promise<T> 響應數據 - Response data
     */
    delete: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> =>
        interceptor.delete<T>(url, config).then((response) => response.data),

    /**
     * 獲取原始 Axios 實例 - Get Raw Axios Instance
     * 用於需要直接操作響應對象的場景 - For scenarios that need direct response object manipulation
     */
    instance: interceptor,
};

// ========== 工具函數 - Utility Functions ==========

/**
 * 設置認證 Token - Set Authentication Token
 * @param token 認證 Token - Authentication token
 */
export const setAuthToken = (token: string): void => {
    localStorage.setItem('bgm_access_token', token);
    interceptor.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

/**
 * 清除認證 Token - Clear Authentication Token
 */
export const clearAuthToken = (): void => {
    localStorage.removeItem('bgm_access_token');
    delete interceptor.defaults.headers.common['Authorization'];
};

/**
 * 獲取當前認證 Token - Get Current Authentication Token
 * @returns string | null 當前 Token - Current token
 */
export const getAuthToken = (): string | null => {
    return localStorage.getItem('bgm_access_token');
};

/**
 * 檢查是否已認證 - Check if authenticated
 * @returns boolean 是否已認證 - Whether authenticated
 */
export const isAuthenticated = (): boolean => {
    return !!getAuthToken();
};

/**
 * 設置 API 基礎 URL - Set API Base URL
 * @param baseURL 新的基礎 URL - New base URL
 */
export const setBaseURL = (baseURL: string): void => {
    interceptor.defaults.baseURL = baseURL;
};

/**
 * 設置請求超時時間 - Set Request Timeout
 * @param timeout 超時時間(毫秒) - Timeout in milliseconds
 */
export const setTimeout = (timeout: number): void => {
    interceptor.defaults.timeout = timeout;
};

// 擴展 AxiosRequestConfig 類型以支持 metadata - Extend AxiosRequestConfig type to support metadata
declare module 'axios' {
    interface AxiosRequestConfig {
        metadata?: {
            startTime: Date;
        };
    }
}

export default bgmApi;
