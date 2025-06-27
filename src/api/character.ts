// 角色相關 API - Character Related API
import {
    Character,
    CharacterDetail,
    CharacterSubject,
    CharacterPerson,
    CharacterCollection,
    CharacterSearchResult,
} from '@/types';
import bgmApi from './bgm-api';

// ========== 角色基本操作 - Basic Character Operations ==========

/**
 * 獲取角色信息 - Get Character Information
 * @param id 角色 ID - Character ID
 * @returns Promise<Character> 角色信息
 */
export const GetCharacter = (id: number): Promise<Character> => {
    return bgmApi.get<Character>(`/v0/characters/${id}`);
};

/**
 * 獲取角色詳細信息 - Get Character Detailed Information
 * @param id 角色 ID - Character ID
 * @returns Promise<CharacterDetail> 角色詳細信息
 */
export const GetCharacterDetail = (id: number): Promise<CharacterDetail> => {
    return bgmApi.get<CharacterDetail>(`/v0/characters/${id}?responseGroup=large`);
};

/**
 * 獲取多個角色信息 - Get Multiple Characters Information
 * @param ids 角色 ID 列表 - Character ID list
 * @returns Promise<Character[]> 角色信息列表
 */
export const GetCharacters = (ids: number[]): Promise<Character[]> => {
    const idsParam = ids.join(',');
    return bgmApi.get<Character[]>(`/v0/characters?ids=${idsParam}`);
};

// ========== 角色關聯內容 - Character Related Content ==========

/**
 * 獲取角色相關條目 - Get Character Related Subjects
 * @param id 角色 ID - Character ID
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<CharacterSubject[]> 角色相關條目列表
 */
export const GetCharacterSubjects = (id: number, limit?: number, offset?: number): Promise<CharacterSubject[]> => {
    const params = { limit, offset };
    return bgmApi.get<CharacterSubject[]>(`/v0/characters/${id}/subjects`, { params });
};

/**
 * 獲取角色相關人物 - Get Character Related Persons
 * @param id 角色 ID - Character ID
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<CharacterPerson[]> 角色相關人物列表
 */
export const GetCharacterPersons = (id: number, limit?: number, offset?: number): Promise<CharacterPerson[]> => {
    const params = { limit, offset };
    return bgmApi.get<CharacterPerson[]>(`/v0/characters/${id}/persons`, { params });
};

// ========== 角色搜索 - Character Search ==========

/**
 * 搜索角色 - Search Characters
 * @param keyword 搜索關鍵字 - Search keyword
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<CharacterSearchResult> 搜索結果
 */
export const SearchCharacters = (keyword: string, limit?: number, offset?: number): Promise<CharacterSearchResult> => {
    const params = { keyword, limit, offset };
    return bgmApi.get<CharacterSearchResult>(`/v0/search/characters`, { params });
};

/**
 * 高級搜索角色 - Advanced Search Characters
 * @param params 搜索參數 - Search parameters
 * @returns Promise<CharacterSearchResult> 搜索結果
 */
export const AdvancedSearchCharacters = (params: {
    keyword: string;
    type?: number;
    subject_id?: number;
    sort?: 'match' | 'name' | 'collects';
    order?: 'asc' | 'desc';
    offset?: number;
    limit?: number;
}): Promise<CharacterSearchResult> => {
    return bgmApi.post<CharacterSearchResult>(`/v0/search/characters`, params);
};

// ========== 角色收藏 - Character Collection ==========

/**
 * 收藏角色 - Collect Character
 * @param id 角色 ID - Character ID
 * @param comment 收藏評論 - Collection comment (可選)
 * @returns Promise<void>
 */
export const CollectCharacter = (id: number, comment?: string): Promise<void> => {
    const data = { comment };
    return bgmApi.post<void>(`/v0/characters/${id}/collect`, data);
};

/**
 * 取消收藏角色 - Uncollect Character
 * @param id 角色 ID - Character ID
 * @returns Promise<void>
 */
export const UncollectCharacter = (id: number): Promise<void> => {
    return bgmApi.delete<void>(`/v0/characters/${id}/collect`);
};

/**
 * 獲取角色收藏狀態 - Get Character Collection Status
 * @param id 角色 ID - Character ID
 * @returns Promise<CharacterCollection | null> 收藏信息，如果未收藏則返回 null
 */
export const GetCharacterCollectionStatus = (id: number): Promise<CharacterCollection | null> => {
    return bgmApi.get<CharacterCollection | null>(`/v0/characters/${id}/collect`);
};

// ========== 角色統計 - Character Statistics ==========

/**
 * 獲取熱門角色列表 - Get Popular Characters
 * @param type 條目類型 - Subject type (可選)
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<Character[]> 熱門角色列表
 */
export const GetPopularCharacters = (type?: number, limit?: number, offset?: number): Promise<Character[]> => {
    const params = { type, limit, offset };
    return bgmApi.get<Character[]>(`/v0/characters/popular`, { params });
};

/**
 * 獲取最新角色列表 - Get Latest Characters
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<Character[]> 最新角色列表
 */
export const GetLatestCharacters = (limit?: number, offset?: number): Promise<Character[]> => {
    const params = { limit, offset };
    return bgmApi.get<Character[]>(`/v0/characters/latest`, { params });
};
