// 收藏相關 API - Collection Related API
import {
    Paged_UserCollection,
    UserSubjectCollection,
    UserSubjectCollectionModifyPayload,
    UserEpisodeCollection,
    EpisodeCollectionType,
    Paged_UserCharacterCollection,
    UserCharacterCollection,
    Paged_UserPersonCollection,
    UserPersonCollection,
} from '@/types';
import bgmApi from './bgm-api';

// ========== 條目收藏管理 - Subject Collection Management ==========

/**
 * 獲取用戶收藏 - Get User Collections
 * @param username 用戶名 - Username
 * @param subject_type 條目類型 - Subject type (可選)
 * @param type 收藏類型 - Collection type (可選)
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<Paged_UserCollection> 用戶收藏列表
 */
export const GetUserCollections = (
    username: string,
    subject_type?: number,
    type?: number,
    limit?: number,
    offset?: number
): Promise<Paged_UserCollection> => {
    const params = { subject_type, type, limit, offset };
    return bgmApi.get<Paged_UserCollection>(`/v0/users/${username}/collections`, { params });
};

/**
 * 獲取用戶單個條目收藏 - Get User Single Subject Collection
 * @param username 用戶名 - Username
 * @param subject_id 條目 ID - Subject ID
 * @returns Promise<UserSubjectCollection> 用戶條目收藏信息
 */
export const GetUserCollection = (username: string, subject_id: number): Promise<UserSubjectCollection> => {
    return bgmApi.get<UserSubjectCollection>(`/v0/users/${username}/collections/${subject_id}`);
};

/**
 * 新增或修改用戶單個條目收藏 - Add or Modify User Subject Collection
 * @param subject_id 條目 ID - Subject ID
 * @param data 收藏數據 - Collection data
 * @returns Promise<void>
 */
export const PostUserCollection = (subject_id: number, data: UserSubjectCollectionModifyPayload): Promise<void> => {
    return bgmApi.post<void>(`/v0/users/-/collections/${subject_id}`, data);
};

/**
 * 修改用戶單個收藏 - Modify User Single Collection
 * @param subject_id 條目 ID - Subject ID
 * @param data 收藏數據 - Collection data
 * @returns Promise<void>
 */
export const PatchUserCollection = (subject_id: number, data: UserSubjectCollectionModifyPayload): Promise<void> => {
    return bgmApi.patch<void>(`/v0/users/-/collections/${subject_id}`, data);
};

// ========== 章節收藏管理 - Episode Collection Management ==========

/**
 * 獲取章節收藏信息 - Get User Subject Episode Collection
 * @param subject_id 條目 ID - Subject ID
 * @param offset 偏移量 - Offset (可選)
 * @param limit 每頁數量 - Items per page (可選)
 * @param episode_type 章節類型 - Episode type (可選)
 * @returns Promise<UserEpisodeCollection[]> 章節收藏信息
 */
export const GetUserSubjectEpisodeCollection = (
    subject_id: number,
    offset?: number,
    limit?: number,
    episode_type?: number
): Promise<{ data: UserEpisodeCollection[] }> => {
    const params = { offset, limit, episode_type };
    return bgmApi.get<{ data: UserEpisodeCollection[] }>(`/v0/users/-/collections/${subject_id}/episodes`, { params });
};

/**
 * 修改章節收藏信息 - Patch User Subject Episode Collection
 * @param subject_id 條目 ID - Subject ID
 * @param data 章節收藏數據 - Episode collection data
 * @returns Promise<void>
 */
export const PatchUserSubjectEpisodeCollection = (
    subject_id: number,
    data: {
        episode_id: number[];
        type: EpisodeCollectionType;
    }
): Promise<void> => {
    return bgmApi.patch<void>(`/v0/users/-/collections/${subject_id}/episodes`, data);
};

/**
 * 獲取單個章節收藏信息 - Get User Episode Collection
 * @param episode_id 章節 ID - Episode ID
 * @returns Promise<UserEpisodeCollection> 章節收藏信息
 */
export const GetUserEpisodeCollection = (episode_id: number): Promise<UserEpisodeCollection> => {
    return bgmApi.get<UserEpisodeCollection>(`/v0/users/-/collections/-/episodes/${episode_id}`);
};

/**
 * 更新章節收藏信息 - Put User Episode Collection
 * @param episode_id 章節 ID - Episode ID
 * @param data 章節收藏類型 - Episode collection type
 * @returns Promise<void>
 */
export const PutUserEpisodeCollection = (episode_id: number, data: { type: EpisodeCollectionType }): Promise<void> => {
    return bgmApi.put<void>(`/v0/users/-/collections/-/episodes/${episode_id}`, data);
};

// ========== 角色收藏管理 - Character Collection Management ==========

/**
 * 獲取用戶角色收藏列表 - Get User Character Collections
 * @param username 用戶名 - Username
 * @returns Promise<Paged_UserCharacterCollection> 用戶角色收藏列表
 */
export const GetUserCharacterCollections = (username: string): Promise<Paged_UserCharacterCollection> => {
    return bgmApi.get<Paged_UserCharacterCollection>(`/v0/users/${username}/collections/-/characters`);
};

/**
 * 獲取用戶單個角色收藏信息 - Get User Character Collection
 * @param username 用戶名 - Username
 * @param character_id 角色 ID - Character ID
 * @returns Promise<UserCharacterCollection> 用戶角色收藏信息
 */
export const GetUserCharacterCollection = (
    username: string,
    character_id: number
): Promise<UserCharacterCollection> => {
    return bgmApi.get<UserCharacterCollection>(`/v0/users/${username}/collections/-/characters/${character_id}`);
};

// ========== 人物收藏管理 - Person Collection Management ==========

/**
 * 獲取用戶人物收藏列表 - Get User Person Collections
 * @param username 用戶名 - Username
 * @returns Promise<Paged_UserPersonCollection> 用戶人物收藏列表
 */
export const GetUserPersonCollections = (username: string): Promise<Paged_UserPersonCollection> => {
    return bgmApi.get<Paged_UserPersonCollection>(`/v0/users/${username}/collections/-/persons`);
};

/**
 * 獲取用戶單個人物收藏信息 - Get User Person Collection
 * @param username 用戶名 - Username
 * @param person_id 人物 ID - Person ID
 * @returns Promise<UserPersonCollection> 用戶人物收藏信息
 */
export const GetUserPersonCollection = (username: string, person_id: number): Promise<UserPersonCollection> => {
    return bgmApi.get<UserPersonCollection>(`/v0/users/${username}/collections/-/persons/${person_id}`);
};
