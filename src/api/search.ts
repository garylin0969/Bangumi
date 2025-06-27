// 搜索相關 API - Search Related API
import {
    SubjectSearchResult,
    CharacterSearchResult,
    PersonSearchResult,
    SearchParams,
    AdvancedSearchParams,
    SearchSuggestion,
    SearchSuggestionsResponse,
    SearchStats,
} from '@/types';
import bgmApi from './bgm-api';

// ========== 綜合搜索 - Comprehensive Search ==========

/**
 * 全局搜索 - Global Search
 * @param keyword 搜索關鍵字 - Search keyword
 * @param categories 搜索類別 - Search categories (可選)
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<{subjects: SubjectSearchResult; characters: CharacterSearchResult; persons: PersonSearchResult}> 綜合搜索結果
 */
export const GlobalSearch = (
    keyword: string,
    categories: ('subjects' | 'characters' | 'persons')[] = ['subjects', 'characters', 'persons'],
    limit?: number,
    offset?: number
): Promise<{
    subjects: SubjectSearchResult;
    characters: CharacterSearchResult;
    persons: PersonSearchResult;
}> => {
    const params = { keyword, categories: categories.join(','), limit, offset };
    return bgmApi.get(`/v0/search/global`, { params });
};

/**
 * 快速搜索 - Quick Search
 * @param keyword 搜索關鍵字 - Search keyword
 * @param category 搜索類別 - Search category
 * @param limit 結果數量限制 - Result limit (可選，默認 10)
 * @returns Promise<any[]> 快速搜索結果
 */
export const QuickSearch = (
    keyword: string,
    category: 'subjects' | 'characters' | 'persons' | 'all' = 'all',
    limit: number = 10
): Promise<any[]> => {
    const params = { keyword, category, limit };
    return bgmApi.get(`/v0/search/quick`, { params });
};

// ========== 條目搜索 - Subject Search ==========

/**
 * 搜索條目 - Search Subjects
 * @param params 搜索參數 - Search parameters
 * @returns Promise<SubjectSearchResult> 條目搜索結果
 */
export const UnifiedSearchSubjects = (params: SearchParams): Promise<SubjectSearchResult> => {
    return bgmApi.get<SubjectSearchResult>(`/search/subject/${encodeURIComponent(params.keyword)}`, {
        params: {
            type: params.type,
            responseGroup: params.responseGroup,
            start: params.start,
            max_results: params.max_results,
        },
    });
};

/**
 * 高級條目搜索 - Advanced Subject Search
 * @param params 高級搜索參數 - Advanced search parameters
 * @returns Promise<SubjectSearchResult> 條目搜索結果
 */
export const UnifiedAdvancedSearchSubjects = (params: AdvancedSearchParams): Promise<SubjectSearchResult> => {
    return bgmApi.post<SubjectSearchResult>(`/v0/search/subjects`, params);
};

/**
 * 按標籤搜索條目 - Search Subjects by Tag
 * @param tag 標籤名稱 - Tag name
 * @param type 條目類型 - Subject type (可選)
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<SubjectSearchResult> 搜索結果
 */
export const SearchSubjectsByTag = (
    tag: string,
    type?: number,
    limit?: number,
    offset?: number
): Promise<SubjectSearchResult> => {
    const params = { tag, type, limit, offset };
    return bgmApi.get<SubjectSearchResult>(`/v0/search/subjects/tag`, { params });
};

// ========== 角色搜索 - Character Search ==========

/**
 * 搜索角色 - Search Characters
 * @param keyword 搜索關鍵字 - Search keyword
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<CharacterSearchResult> 角色搜索結果
 */
export const UnifiedSearchCharacters = (
    keyword: string,
    limit?: number,
    offset?: number
): Promise<CharacterSearchResult> => {
    const params = { keyword, limit, offset };
    return bgmApi.get<CharacterSearchResult>(`/v0/search/characters`, { params });
};

/**
 * 高級角色搜索 - Advanced Character Search
 * @param params 搜索參數 - Search parameters
 * @returns Promise<CharacterSearchResult> 角色搜索結果
 */
export const UnifiedAdvancedSearchCharacters = (params: {
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

// ========== 人物搜索 - Person Search ==========

/**
 * 搜索人物 - Search Persons
 * @param keyword 搜索關鍵字 - Search keyword
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<PersonSearchResult> 人物搜索結果
 */
export const UnifiedSearchPersons = (keyword: string, limit?: number, offset?: number): Promise<PersonSearchResult> => {
    const params = { keyword, limit, offset };
    return bgmApi.get<PersonSearchResult>(`/v0/search/persons`, { params });
};

/**
 * 高級人物搜索 - Advanced Person Search
 * @param params 搜索參數 - Search parameters
 * @returns Promise<PersonSearchResult> 人物搜索結果
 */
export const UnifiedAdvancedSearchPersons = (params: {
    keyword: string;
    type?: number;
    career?: string[];
    subject_id?: number;
    sort?: 'match' | 'name' | 'collects';
    order?: 'asc' | 'desc';
    offset?: number;
    limit?: number;
}): Promise<PersonSearchResult> => {
    return bgmApi.post<PersonSearchResult>(`/v0/search/persons`, params);
};

// ========== 搜索建議 - Search Suggestions ==========

/**
 * 獲取搜索建議 - Get Search Suggestions
 * @param keyword 搜索關鍵字 - Search keyword
 * @param category 搜索類別 - Search category (可選)
 * @param limit 建議數量 - Suggestion limit (可選)
 * @returns Promise<SearchSuggestionsResponse> 搜索建議響應
 */
export const GetSearchSuggestions = (
    keyword: string,
    category?: 'subject' | 'character' | 'person' | 'tag',
    limit?: number
): Promise<SearchSuggestionsResponse> => {
    const params = { keyword, category, limit };
    return bgmApi.get<SearchSuggestionsResponse>(`/v0/search/suggestions`, { params });
};

/**
 * 獲取熱門搜索關鍵字 - Get Popular Search Keywords
 * @param category 搜索類別 - Search category (可選)
 * @param limit 關鍵字數量 - Keyword limit (可選)
 * @returns Promise<string[]> 熱門關鍵字列表
 */
export const GetPopularSearchKeywords = (
    category?: 'subject' | 'character' | 'person',
    limit?: number
): Promise<string[]> => {
    const params = { category, limit };
    return bgmApi.get<string[]>(`/v0/search/popular-keywords`, { params });
};

/**
 * 獲取搜索歷史 - Get Search History
 * @param limit 歷史記錄數量 - History limit (可選)
 * @returns Promise<string[]> 搜索歷史列表
 */
export const GetSearchHistory = (limit?: number): Promise<string[]> => {
    const params = { limit };
    return bgmApi.get<string[]>(`/v0/search/history`, { params });
};

/**
 * 清除搜索歷史 - Clear Search History
 * @returns Promise<void>
 */
export const ClearSearchHistory = (): Promise<void> => {
    return bgmApi.delete<void>(`/v0/search/history`);
};

// ========== 搜索統計 - Search Statistics ==========

/**
 * 獲取搜索統計 - Get Search Statistics
 * @param keyword 搜索關鍵字 - Search keyword
 * @returns Promise<SearchStats> 搜索統計
 */
export const GetSearchStats = (keyword: string): Promise<SearchStats> => {
    const params = { keyword };
    return bgmApi.get<SearchStats>(`/v0/search/stats`, { params });
};

/**
 * 記錄搜索行為 - Record Search Action
 * @param keyword 搜索關鍵字 - Search keyword
 * @param category 搜索類別 - Search category
 * @param result_count 結果數量 - Result count
 * @returns Promise<void>
 */
export const RecordSearchAction = (keyword: string, category: string, result_count: number): Promise<void> => {
    const data = { keyword, category, result_count };
    return bgmApi.post<void>(`/v0/search/record`, data);
};

// ========== 智能搜索 - Smart Search ==========

/**
 * 智能搜索 - Smart Search
 * @param query 查詢字符串 - Query string
 * @param context 搜索上下文 - Search context (可選)
 * @returns Promise<any> 智能搜索結果
 */
export const SmartSearch = (
    query: string,
    context?: {
        user_preferences?: string[];
        recent_views?: number[];
        current_season?: string;
    }
): Promise<any> => {
    const data = { query, context };
    return bgmApi.post(`/v0/search/smart`, data);
};

/**
 * 相似內容推薦搜索 - Similar Content Recommendation Search
 * @param reference_id 參考條目 ID - Reference subject ID
 * @param type 搜索類型 - Search type
 * @param limit 推薦數量 - Recommendation limit (可選)
 * @returns Promise<any[]> 相似內容列表
 */
export const SimilarContentSearch = (
    reference_id: number,
    type: 'subject' | 'character' | 'person',
    limit?: number
): Promise<any[]> => {
    const params = { reference_id, type, limit };
    return bgmApi.get(`/v0/search/similar`, { params });
};
