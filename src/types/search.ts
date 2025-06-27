// 搜索相關類型定義 - Search Related Types
import { Character } from './character';
import { SubjectType } from './common';
import { Person } from './person';
import { Subject } from './subject';

/**
 * 搜索結果基礎介面 - Base Search Result Interface
 */
export interface BaseSearchResult {
    /** 搜索結果總數 - Total search results */
    results: number;
}

/**
 * 條目搜索結果 - Subject Search Result
 */
export interface SubjectSearchResult extends BaseSearchResult {
    /** 條目列表 - Subject list */
    list: Subject[];
}

/**
 * 角色搜索結果 - Character Search Result
 */
export interface CharacterSearchResult extends BaseSearchResult {
    /** 角色列表 - Character list */
    list: Character[];
}

/**
 * 人物搜索結果 - Person Search Result
 */
export interface PersonSearchResult extends BaseSearchResult {
    /** 人物列表 - Person list */
    list: Person[];
}

/**
 * 搜索參數 - Search Parameters
 */
export interface SearchParams {
    /** 搜索關鍵字 - Search keyword */
    keyword: string;
    /** 條目類型 - Subject type */
    type?: SubjectType;
    /** 響應組 - Response group */
    responseGroup?: 'large' | 'medium' | 'small';
    /** 起始位置 - Start position */
    start?: number;
    /** 最大結果數 - Maximum results */
    max_results?: number;
}

/**
 * 高級搜索參數 - Advanced Search Parameters
 */
export interface AdvancedSearchParams extends SearchParams {
    /** 標籤 - Tags */
    tag?: string[];
    /** 排除標籤 - Exclude tags */
    exclude_tag?: string[];
    /** 評分範圍 - Rating range */
    rating?: {
        /** 最低評分 - Minimum rating */
        min?: number;
        /** 最高評分 - Maximum rating */
        max?: number;
    };
    /** 收藏數範圍 - Collection count range */
    collect?: {
        /** 最小收藏數 - Minimum collection count */
        min?: number;
        /** 最大收藏數 - Maximum collection count */
        max?: number;
    };
    /** 發布日期範圍 - Release date range */
    date?: {
        /** 開始日期 - Start date */
        start?: string;
        /** 結束日期 - End date */
        end?: string;
    };
    /** 排序方式 - Sort order */
    sort?: 'match' | 'heat' | 'rate' | 'date';
    /** 排序方向 - Sort direction */
    order?: 'asc' | 'desc';
}

/**
 * 搜索建議 - Search Suggestion
 */
export interface SearchSuggestion {
    /** 建議文本 - Suggestion text */
    text: string;
    /** 建議類型 - Suggestion type */
    type: 'subject' | 'character' | 'person' | 'tag';
    /** 相關 ID - Related ID */
    id?: number;
    /** 匹配度 - Match score */
    score?: number;
}

/**
 * 搜索建議響應 - Search Suggestions Response
 */
export interface SearchSuggestionsResponse {
    /** 查詢詞 - Query term */
    query: string;
    /** 建議列表 - Suggestions list */
    suggestions: SearchSuggestion[];
}

/**
 * 搜索統計 - Search Statistics
 */
export interface SearchStats {
    /** 查詢詞 - Query term */
    query: string;
    /** 總結果數 - Total results */
    total_results: number;
    /** 搜索耗時(毫秒) - Search time in milliseconds */
    search_time: number;
    /** 按類型分組的結果數 - Results count by type */
    results_by_type: {
        /** 條目 - Subjects */
        subjects: number;
        /** 角色 - Characters */
        characters: number;
        /** 人物 - Persons */
        persons: number;
    };
}
