// 條目相關 API - Subject Related API
import type {
    CalendarItem,
    Subject,
    SubjectDetail,
    SubjectSearchResult,
    Character,
    Person,
    SubjectIndex,
    IndexSubject,
    SubjectStats,
    SubjectRecommendation,
} from '@/types';
import { EpisodesResponse } from '@/types';
import bgmApi from './bgm-api';

// ========== 條目基本操作 - Basic Subject Operations ==========

/**
 * 獲取每日放送 - Get Calendar
 * @returns Promise<CalendarItem[]> 每日放送數據
 */
export const GetCalendar = (): Promise<CalendarItem[]> => {
    return bgmApi.get<CalendarItem[]>('/calendar');
};

/**
 * 獲取條目信息 - Get Subject Information
 * @param id 條目 ID - Subject ID
 * @returns Promise<Subject> 條目信息
 */
export const GetSubject = (id: number): Promise<Subject> => {
    return bgmApi.get<Subject>(`/v0/subjects/${id}`);
};

/**
 * 獲取條目詳細信息 - Get Subject Detailed Information
 * @param id 條目 ID - Subject ID
 * @returns Promise<SubjectDetail> 條目詳細信息
 */
export const GetSubjectDetail = (id: number): Promise<SubjectDetail> => {
    return bgmApi.get<SubjectDetail>(`/v0/subjects/${id}?responseGroup=large`);
};

/**
 * 獲取多個條目信息 - Get Multiple Subjects Information
 * @param ids 條目 ID 列表 - Subject ID list
 * @returns Promise<Subject[]> 條目信息列表
 */
export const GetSubjects = (ids: number[]): Promise<Subject[]> => {
    const idsParam = ids.join(',');
    return bgmApi.get<Subject[]>(`/v0/subjects?ids=${idsParam}`);
};

// ========== 條目關聯內容 - Subject Related Content ==========

/**
 * 獲取條目角色列表 - Get Subject Characters
 * @param id 條目 ID - Subject ID
 * @returns Promise<Character[]> 角色列表
 */
export const GetSubjectCharacters = (id: number): Promise<Character[]> => {
    return bgmApi.get<Character[]>(`/v0/subjects/${id}/characters`);
};

/**
 * 獲取條目製作人員 - Get Subject Persons
 * @param id 條目 ID - Subject ID
 * @returns Promise<Person[]> 人物列表
 */
export const GetSubjectPersons = (id: number): Promise<Person[]> => {
    return bgmApi.get<Person[]>(`/v0/subjects/${id}/persons`);
};

/**
 * 獲取條目章節 - Get Subject Episodes
 * @param id 條目 ID - Subject ID
 * @param type 章節類型 - Episode type (可選)
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<EpisodesResponse> 章節響應
 */
export const GetSubjectEpisodes = (
    id: number,
    type?: number,
    limit?: number,
    offset?: number
): Promise<EpisodesResponse> => {
    const params = {
        type,
        limit,
        offset,
    };

    return bgmApi.get<EpisodesResponse>(`/v0/subjects/${id}/episodes`, { params });
};

/**
 * 獲取條目關聯 - Get Subject Relations
 * @param id 條目 ID - Subject ID
 * @returns Promise<Subject[]> 關聯條目列表
 */
export const GetSubjectRelations = (id: number): Promise<Subject[]> => {
    return bgmApi.get<Subject[]>(`/v0/subjects/${id}/subjects`);
};

// ========== 條目搜索 - Subject Search ==========

/**
 * 搜索條目 - Search Subjects
 * @param keyword 搜索關鍵字 - Search keyword
 * @param type 條目類型 - Subject type (可選)
 * @param responseGroup 響應組 - Response group (可選)
 * @param start 起始位置 - Start position (可選)
 * @param max_results 最大結果數 - Maximum results (可選)
 * @returns Promise<SubjectSearchResult> 搜索結果
 */
export const SearchSubjects = (
    keyword: string,
    type?: number,
    responseGroup?: 'large' | 'medium' | 'small',
    start?: number,
    max_results?: number
): Promise<SubjectSearchResult> => {
    const params = {
        keyword,
        type,
        responseGroup,
        start,
        max_results,
    };

    return bgmApi.get<SubjectSearchResult>(`/search/subject/${encodeURIComponent(keyword)}`, { params });
};

/**
 * 高級搜索條目 - Advanced Search Subjects
 * @param params 搜索參數 - Search parameters
 * @returns Promise<SubjectSearchResult> 搜索結果
 */
export const AdvancedSearchSubjects = (params: {
    keyword: string;
    type?: number;
    tag?: string[];
    air_date?: string;
    rating?: { min?: number; max?: number };
    rank?: { min?: number; max?: number };
    nsfw?: boolean;
    sort?: 'match' | 'heat' | 'rate' | 'date';
    order?: 'asc' | 'desc';
    offset?: number;
    limit?: number;
}): Promise<SubjectSearchResult> => {
    return bgmApi.post<SubjectSearchResult>(`/v0/search/subjects`, params);
};

// ========== 條目統計與推薦 - Subject Statistics & Recommendations ==========

/**
 * 獲取條目統計信息 - Get Subject Statistics
 * @param id 條目 ID - Subject ID
 * @returns Promise<SubjectStats> 條目統計
 */
export const GetSubjectStats = (id: number): Promise<SubjectStats> => {
    return bgmApi.get<SubjectStats>(`/v0/subjects/${id}/stats`);
};

/**
 * 獲取條目推薦 - Get Subject Recommendations
 * @param id 條目 ID - Subject ID
 * @param limit 推薦數量 - Recommendation limit (可選)
 * @returns Promise<SubjectRecommendation[]> 推薦列表
 */
export const GetSubjectRecommendations = (id: number, limit?: number): Promise<SubjectRecommendation[]> => {
    const params = { limit };
    return bgmApi.get<SubjectRecommendation[]>(`/v0/subjects/${id}/recommendations`, { params });
};

// ========== 條目索引 - Subject Index ==========

/**
 * 獲取條目索引 - Get Subject Index
 * @param id 索引 ID - Index ID
 * @returns Promise<SubjectIndex> 索引信息
 */
export const GetSubjectIndex = (id: number): Promise<SubjectIndex> => {
    return bgmApi.get<SubjectIndex>(`/v0/indices/${id}`);
};

/**
 * 獲取索引中的條目 - Get Subjects in Index
 * @param id 索引 ID - Index ID
 * @param type 條目類型 - Subject type (可選)
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<IndexSubject[]> 索引條目列表
 */
export const GetIndexSubjects = (
    id: number,
    type?: number,
    limit?: number,
    offset?: number
): Promise<IndexSubject[]> => {
    const params = { type, limit, offset };
    return bgmApi.get<IndexSubject[]>(`/v0/indices/${id}/subjects`, { params });
};

/**
 * 搜索條目索引 - Search Subject Indices
 * @param keyword 搜索關鍵字 - Search keyword
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<SubjectIndex[]> 索引列表
 */
export const SearchSubjectIndices = (keyword: string, limit?: number, offset?: number): Promise<SubjectIndex[]> => {
    const params = { keyword, limit, offset };
    return bgmApi.get<SubjectIndex[]>(`/v0/search/indices`, { params });
};
