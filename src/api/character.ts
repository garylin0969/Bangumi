// 角色相關 API - Character Related API
import { Character, CharacterPerson, v0_RelatedSubject, Paged_Character } from '@/types';
import bgmApi from './bgm-api';

// ========== 角色基本操作 - Basic Character Operations ==========

/**
 * 獲取角色詳情 - Get Character Detail
 * @param character_id 角色 ID - Character ID
 * @returns Promise<Character> 角色詳情
 */
export const GetCharacter = (character_id: number): Promise<Character> => {
    return bgmApi.get<Character>(`/v0/characters/${character_id}`);
};

/**
 * 獲取角色圖片 - Get Character Image
 * @param character_id 角色 ID - Character ID
 * @param type 圖片類型 - Image type (small|grid|large|medium)
 * @returns Promise<string> 圖片URL (通過302重定向)
 */
export const GetCharacterImage = (
    character_id: number,
    type: 'small' | 'grid' | 'large' | 'medium'
): Promise<string> => {
    return bgmApi.get<string>(`/v0/characters/${character_id}/image?type=${type}`);
};

// ========== 角色關聯內容 - Character Related Content ==========

/**
 * 獲取角色相關條目 - Get Character Related Subjects
 * @param character_id 角色 ID - Character ID
 * @returns Promise<v0_RelatedSubject[]> 角色相關條目列表
 */
export const GetCharacterSubjects = (character_id: number): Promise<v0_RelatedSubject[]> => {
    return bgmApi.get<v0_RelatedSubject[]>(`/v0/characters/${character_id}/subjects`);
};

/**
 * 獲取角色相關人物 - Get Character Related Persons
 * @param character_id 角色 ID - Character ID
 * @returns Promise<CharacterPerson[]> 角色相關人物列表
 */
export const GetCharacterPersons = (character_id: number): Promise<CharacterPerson[]> => {
    return bgmApi.get<CharacterPerson[]>(`/v0/characters/${character_id}/persons`);
};

// ========== 角色搜索 - Character Search ==========

/**
 * 搜索角色 - Search Characters
 * @param params 搜索參數 - Search parameters
 * @returns Promise<Paged_Character> 搜索結果
 */
export const SearchCharacters = (params: {
    keyword: string;
    filter?: {
        nsfw?: boolean;
    };
    limit?: number;
    offset?: number;
}): Promise<Paged_Character> => {
    return bgmApi.post<Paged_Character>('/v0/search/characters', params);
};

// ========== 角色收藏 - Character Collection ==========

/**
 * 收藏角色 - Collect Character
 * @param character_id 角色 ID - Character ID
 * @returns Promise<void>
 */
export const CollectCharacter = (character_id: number): Promise<void> => {
    return bgmApi.post<void>(`/v0/characters/${character_id}/collect`);
};

/**
 * 取消收藏角色 - Uncollect Character
 * @param character_id 角色 ID - Character ID
 * @returns Promise<void>
 */
export const UncollectCharacter = (character_id: number): Promise<void> => {
    return bgmApi.delete<void>(`/v0/characters/${character_id}/collect`);
};
