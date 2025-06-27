import { User } from '@/types';
import bgmApi from './bgm-api';

// 獲取用戶基本信息（公開部分）
export const GetUser = (username: string): Promise<User> => {
    return bgmApi.get<User>(`/v0/users/${username}`);
};
