// 用戶相關 API - User Related API
import { User } from '@/types';
import bgmApi from './bgm-api';

// ========== 用戶基本操作 - Basic User Operations ==========

/**
 * 獲取用戶 - Get User by name
 * @param username 用戶名 - Username
 * @returns Promise<User> 用戶信息
 */
export const GetUser = (username: string): Promise<User> => {
    return bgmApi.get<User>(`/v0/users/${username}`);
};

/**
 * 獲取用戶頭像 - Get User Avatar by name
 * @param username 用戶名 - Username
 * @param type 頭像類型 - Avatar type (small|large|medium)
 * @returns Promise<string> 頭像URL (通過302重定向)
 */
export const GetUserAvatar = (username: string, type: 'small' | 'large' | 'medium'): Promise<string> => {
    return bgmApi.get<string>(`/v0/users/${username}/avatar`, {
        params: { type },
    });
};

/**
 * 獲取當前用戶 - Get Current User
 * @returns Promise<User> 當前用戶信息 (包含email和reg_time等私有信息)
 */
export const GetCurrentUser = (): Promise<User> => {
    return bgmApi.get<User>('/v0/me');
};
