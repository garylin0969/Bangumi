import type { User, UserCollectionsResponse } from '@/types';
import bgmApi from './bgm-api';

// 獲取用戶基本信息（公開部分）
export const GetUser = (username: string): Promise<User> => {
    return bgmApi.get<User>(`/v0/users/${username}`);
};

// 獲取用戶收藏（公開部分）
export const GetUserCollections = (
    username: string,
    subject_type?: number,
    type?: number,
    limit?: number,
    offset?: number
): Promise<UserCollectionsResponse> => {
    const params = {
        subject_type,
        type,
        limit,
        offset,
    };

    return bgmApi.get<UserCollectionsResponse>(`/v0/users/${username}/collections`, { params });
};
