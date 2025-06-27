// 條目相關 API - Subject Related API
import { Subject, RelatedCharacter, RelatedPerson, v0_subject_relation, Paged_Subject } from '@/types';
import bgmApi from './bgm-api';

// ========== 條目基本操作 - Basic Subject Operations ==========

/**
 * 瀏覽條目 - Browse Subjects
 * @param type 條目類型 - Subject type
 * @param cat 條目分類 - Subject category (可選)
 * @param series 是否系列，僅對書籍類型的條目有效 - Is series, only valid for book type (可選)
 * @param platform 平台，僅對遊戲類型的條目有效 - Platform, only valid for game type (可選)
 * @param sort 排序，枚舉值 {date|rank} - Sort order (可選)
 * @param year 年份 - Year (可選)
 * @param month 月份 - Month (可選)
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<Paged_Subject> 條目列表響應
 */
export const GetSubjects = (params: {
    type: number;
    cat?: number;
    series?: boolean;
    platform?: string;
    sort?: 'date' | 'rank';
    year?: number;
    month?: number;
    limit?: number;
    offset?: number;
}): Promise<Paged_Subject> => {
    return bgmApi.get<Paged_Subject>('/v0/subjects', { params });
};

/**
 * 獲取條目 - Get Subject
 * @param subject_id 條目 ID - Subject ID
 * @returns Promise<Subject> 條目信息
 */
export const GetSubject = (subject_id: number): Promise<Subject> => {
    return bgmApi.get<Subject>(`/v0/subjects/${subject_id}`);
};

/**
 * 獲取條目圖片 - Get Subject Image
 * @param subject_id 條目 ID - Subject ID
 * @param type 圖片類型 - Image type (small|grid|large|medium|common)
 * @returns Promise<string> 圖片URL (通過302重定向)
 */
export const GetSubjectImage = (
    subject_id: number,
    type: 'small' | 'grid' | 'large' | 'medium' | 'common'
): Promise<string> => {
    return bgmApi.get<string>(`/v0/subjects/${subject_id}/image?type=${type}`);
};

/**
 * 獲取條目相關人物 - Get Subject Related Persons
 * @param subject_id 條目 ID - Subject ID
 * @returns Promise<RelatedPerson[]> 相關人物列表
 */
export const GetSubjectPersons = (subject_id: number): Promise<RelatedPerson[]> => {
    return bgmApi.get<RelatedPerson[]>(`/v0/subjects/${subject_id}/persons`);
};

/**
 * 獲取條目相關角色 - Get Subject Related Characters
 * @param subject_id 條目 ID - Subject ID
 * @returns Promise<RelatedCharacter[]> 相關角色列表
 */
export const GetSubjectCharacters = (subject_id: number): Promise<RelatedCharacter[]> => {
    return bgmApi.get<RelatedCharacter[]>(`/v0/subjects/${subject_id}/characters`);
};

/**
 * 獲取條目關聯 - Get Subject Relations
 * @param subject_id 條目 ID - Subject ID
 * @returns Promise<v0_subject_relation[]> 關聯條目列表
 */
export const GetSubjectRelations = (subject_id: number): Promise<v0_subject_relation[]> => {
    return bgmApi.get<v0_subject_relation[]>(`/v0/subjects/${subject_id}/subjects`);
};

// ========== 條目搜索 - Subject Search ==========

/**
 * 條目搜索 - Search Subjects
 * @param params 搜索參數 - Search parameters
 * @returns Promise<Paged_Subject> 搜索結果
 */
export const SearchSubjects = (params: {
    keyword: string;
    sort?: 'match' | 'heat' | 'rank' | 'score';
    filter?: {
        type?: number[];
        meta_tags?: string[];
        tag?: string[];
        air_date?: string[];
        rating?: string[];
        rank?: string[];
        nsfw?: boolean;
    };
    limit?: number;
    offset?: number;
}): Promise<Paged_Subject> => {
    return bgmApi.post<Paged_Subject>('/v0/search/subjects', params);
};
