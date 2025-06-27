// 編輯歷史相關 API - Revision Related API
// import { Paged_Revision, PersonRevision, CharacterRevision, SubjectRevision, DetailedRevision } from '@/types';
import bgmApi from './bgm-api';

// ========== 人物編輯歷史 - Person Revision History ==========

/**
 * 獲取人物編輯歷史 - Get Person Revisions
 * @param person_id 人物 ID - Person ID
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<any> 人物編輯歷史列表
 */
export const GetPersonRevisions = (person_id: number, limit?: number, offset?: number): Promise<any> => {
    const params = { person_id, limit, offset };
    return bgmApi.get<any>('/v0/revisions/persons', { params });
};

/**
 * 獲取人物編輯歷史詳情 - Get Person Revision Detail
 * @param revision_id 版本 ID - Revision ID
 * @returns Promise<any> 人物編輯歷史詳情
 */
export const GetPersonRevision = (revision_id: number): Promise<any> => {
    return bgmApi.get<any>(`/v0/revisions/persons/${revision_id}`);
};

// ========== 角色編輯歷史 - Character Revision History ==========

/**
 * 獲取角色編輯歷史 - Get Character Revisions
 * @param character_id 角色 ID - Character ID
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<any> 角色編輯歷史列表
 */
export const GetCharacterRevisions = (character_id: number, limit?: number, offset?: number): Promise<any> => {
    const params = { character_id, limit, offset };
    return bgmApi.get<any>('/v0/revisions/characters', { params });
};

/**
 * 獲取角色編輯歷史詳情 - Get Character Revision Detail
 * @param revision_id 版本 ID - Revision ID
 * @returns Promise<any> 角色編輯歷史詳情
 */
export const GetCharacterRevision = (revision_id: number): Promise<any> => {
    return bgmApi.get<any>(`/v0/revisions/characters/${revision_id}`);
};

// ========== 條目編輯歷史 - Subject Revision History ==========

/**
 * 獲取條目編輯歷史 - Get Subject Revisions
 * @param subject_id 條目 ID - Subject ID
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<any> 條目編輯歷史列表
 */
export const GetSubjectRevisions = (subject_id: number, limit?: number, offset?: number): Promise<any> => {
    const params = { subject_id, limit, offset };
    return bgmApi.get<any>('/v0/revisions/subjects', { params });
};

/**
 * 獲取條目編輯歷史詳情 - Get Subject Revision Detail
 * @param revision_id 版本 ID - Revision ID
 * @returns Promise<any> 條目編輯歷史詳情
 */
export const GetSubjectRevision = (revision_id: number): Promise<any> => {
    return bgmApi.get<any>(`/v0/revisions/subjects/${revision_id}`);
};

// ========== 章節編輯歷史 - Episode Revision History ==========

/**
 * 獲取章節編輯歷史 - Get Episode Revisions
 * @param episode_id 章節 ID - Episode ID
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<any> 章節編輯歷史列表
 */
export const GetEpisodeRevisions = (episode_id: number, limit?: number, offset?: number): Promise<any> => {
    const params = { episode_id, limit, offset };
    return bgmApi.get<any>('/v0/revisions/episodes', { params });
};

/**
 * 獲取章節編輯歷史詳情 - Get Episode Revision Detail
 * @param revision_id 版本 ID - Revision ID
 * @returns Promise<any> 章節編輯歷史詳情
 */
export const GetEpisodeRevision = (revision_id: number): Promise<any> => {
    return bgmApi.get<any>(`/v0/revisions/episodes/${revision_id}`);
};
