// 用戶相關 API - User Related API
import {
    User,
    UserCollectionsResponse,
    UserCollectionStats,
    UserEpisodeProgress,
    UserFriendsResponse,
    UserIndicesResponse,
} from '@/types';
import bgmApi from './bgm-api';

// ========== 用戶基本操作 - Basic User Operations ==========

/**
 * 獲取用戶基本信息（公開部分）- Get User Basic Information (Public Part)
 * @param username 用戶名 - Username
 * @returns Promise<User> 用戶信息
 */
export const GetUser = (username: string): Promise<User> => {
    return bgmApi.get<User>(`/v0/users/${username}`);
};

/**
 * 獲取當前用戶信息 - Get Current User Information
 * @returns Promise<User> 當前用戶信息
 */
export const GetCurrentUser = (): Promise<User> => {
    return bgmApi.get<User>(`/v0/me`);
};

/**
 * 更新當前用戶信息 - Update Current User Information
 * @param data 用戶更新數據 - User update data
 * @returns Promise<User> 更新後的用戶信息
 */
export const UpdateCurrentUser = (data: { nickname?: string; sign?: string }): Promise<User> => {
    return bgmApi.patch<User>(`/v0/me`, data);
};

// ========== 用戶收藏 - User Collections ==========

/**
 * 獲取用戶收藏 - Get User Collections
 * @param username 用戶名 - Username
 * @param subject_type 條目類型 - Subject type (可選)
 * @param type 收藏類型 - Collection type (可選)
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<UserCollectionsResponse> 用戶收藏響應
 */
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

/**
 * 獲取當前用戶收藏 - Get Current User Collections
 * @param subject_type 條目類型 - Subject type (可選)
 * @param type 收藏類型 - Collection type (可選)
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<UserCollectionsResponse> 當前用戶收藏響應
 */
export const GetCurrentUserCollections = (
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

    return bgmApi.get<UserCollectionsResponse>(`/v0/me/collections`, { params });
};

/**
 * 獲取用戶收藏統計 - Get User Collection Statistics
 * @param username 用戶名 - Username
 * @returns Promise<UserCollectionStats> 收藏統計
 */
export const GetUserCollectionStats = (username: string): Promise<UserCollectionStats> => {
    return bgmApi.get<UserCollectionStats>(`/v0/users/${username}/collections/stats`);
};

/**
 * 獲取當前用戶收藏統計 - Get Current User Collection Statistics
 * @returns Promise<UserCollectionStats> 當前用戶收藏統計
 */
export const GetCurrentUserCollectionStats = (): Promise<UserCollectionStats> => {
    return bgmApi.get<UserCollectionStats>(`/v0/me/collections/stats`);
};

// ========== 用戶章節進度 - User Episode Progress ==========

/**
 * 獲取用戶章節進度 - Get User Episode Progress
 * @param username 用戶名 - Username
 * @param subject_id 條目 ID - Subject ID
 * @returns Promise<UserEpisodeProgress[]> 章節進度列表
 */
export const GetUserEpisodeProgress = (username: string, subject_id: number): Promise<UserEpisodeProgress[]> => {
    return bgmApi.get<UserEpisodeProgress[]>(`/v0/users/${username}/collections/${subject_id}/episodes`);
};

/**
 * 獲取當前用戶章節進度 - Get Current User Episode Progress
 * @param subject_id 條目 ID - Subject ID
 * @returns Promise<UserEpisodeProgress[]> 當前用戶章節進度列表
 */
export const GetCurrentUserEpisodeProgress = (subject_id: number): Promise<UserEpisodeProgress[]> => {
    return bgmApi.get<UserEpisodeProgress[]>(`/v0/me/collections/${subject_id}/episodes`);
};

/**
 * 更新當前用戶章節進度 - Update Current User Episode Progress
 * @param subject_id 條目 ID - Subject ID
 * @param episode_id 章節 ID - Episode ID
 * @param type 觀看狀態 - Watch status
 * @returns Promise<void>
 */
export const UpdateCurrentUserEpisodeProgress = (
    subject_id: number,
    episode_id: number,
    type: number
): Promise<void> => {
    const data = { type };
    return bgmApi.put<void>(`/v0/me/collections/${subject_id}/episodes/${episode_id}`, data);
};

/**
 * 批量更新當前用戶章節進度 - Batch Update Current User Episode Progress
 * @param subject_id 條目 ID - Subject ID
 * @param episodes 章節進度數據 - Episode progress data
 * @returns Promise<void>
 */
export const BatchUpdateCurrentUserEpisodeProgress = (
    subject_id: number,
    episodes: { episode_id: number; type: number }[]
): Promise<void> => {
    const data = { episodes };
    return bgmApi.patch<void>(`/v0/me/collections/${subject_id}/episodes`, data);
};

// ========== 用戶好友關係 - User Friend Relations ==========

/**
 * 獲取用戶好友列表 - Get User Friends
 * @param username 用戶名 - Username
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<UserFriendsResponse> 好友列表響應
 */
export const GetUserFriends = (username: string, limit?: number, offset?: number): Promise<UserFriendsResponse> => {
    const params = { limit, offset };
    return bgmApi.get<UserFriendsResponse>(`/v0/users/${username}/friends`, { params });
};

/**
 * 獲取當前用戶好友列表 - Get Current User Friends
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<UserFriendsResponse> 當前用戶好友列表響應
 */
export const GetCurrentUserFriends = (limit?: number, offset?: number): Promise<UserFriendsResponse> => {
    const params = { limit, offset };
    return bgmApi.get<UserFriendsResponse>(`/v0/me/friends`, { params });
};

/**
 * 關注用戶 - Follow User
 * @param username 用戶名 - Username
 * @returns Promise<void>
 */
export const FollowUser = (username: string): Promise<void> => {
    return bgmApi.post<void>(`/v0/users/${username}/follow`);
};

/**
 * 取消關注用戶 - Unfollow User
 * @param username 用戶名 - Username
 * @returns Promise<void>
 */
export const UnfollowUser = (username: string): Promise<void> => {
    return bgmApi.delete<void>(`/v0/users/${username}/follow`);
};

// ========== 用戶索引 - User Indices ==========

/**
 * 獲取用戶索引列表 - Get User Indices
 * @param username 用戶名 - Username
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<UserIndicesResponse> 用戶索引響應
 */
export const GetUserIndices = (username: string, limit?: number, offset?: number): Promise<UserIndicesResponse> => {
    const params = { limit, offset };
    return bgmApi.get<UserIndicesResponse>(`/v0/users/${username}/indices`, { params });
};

/**
 * 獲取當前用戶索引列表 - Get Current User Indices
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<UserIndicesResponse> 當前用戶索引響應
 */
export const GetCurrentUserIndices = (limit?: number, offset?: number): Promise<UserIndicesResponse> => {
    const params = { limit, offset };
    return bgmApi.get<UserIndicesResponse>(`/v0/me/indices`, { params });
};

// ========== 用戶搜索 - User Search ==========

/**
 * 搜索用戶 - Search Users
 * @param keyword 搜索關鍵字 - Search keyword
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<User[]> 用戶列表
 */
export const SearchUsers = (keyword: string, limit?: number, offset?: number): Promise<User[]> => {
    const params = { keyword, limit, offset };
    return bgmApi.get<User[]>(`/v0/search/users`, { params });
};
