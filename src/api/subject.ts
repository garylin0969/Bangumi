// 條目相關 API - Subject Related API
import {
    Subject,
    RelatedCharacter,
    RelatedPerson,
    v0_subject_relation,
    Paged_Subject,
    SubjectType,
    CalendarItem,
} from '@/types';
import bgmApi from './bgm-api';

// ========== 條目基本操作 - Basic Subject Operations ==========

/**
 * 瀏覽條目 - Browse Subjects
 * @param params 查詢參數 - Query parameters
 * @returns Promise<Paged_Subject> 條目列表響應
 */
export const GetSubjects = (params: {
    /** 條目類型 - Subject type (必填) */
    type: SubjectType;
    /** 條目分類 - Subject category (可選) */
    cat?: number;
    /** 是否系列，僅對書籍類型的條目有效 - Is series, only valid for book type (可選) */
    series?: boolean;
    /** 平台，僅對遊戲類型的條目有效 - Platform, only valid for game type (可選) */
    platform?: string;
    /** 排序，枚舉值 {date|rank} - Sort order (可選) */
    sort?: 'date' | 'rank';
    /** 年份 - Year (可選) */
    year?: number;
    /** 月份 - Month (可選) */
    month?: number;
    /** 每頁數量 - Items per page (可選) */
    limit?: number;
    /** 偏移量 - Offset (可選) */
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
 * @param type 圖片類型 - Image type
 * @returns Promise<string> 圖片URL (通過302重定向)
 */
export const GetSubjectImage = (
    subject_id: number,
    type: 'small' | 'grid' | 'large' | 'medium' | 'common'
): Promise<string> => {
    return bgmApi.get<string>(`/v0/subjects/${subject_id}/image`, {
        params: { type },
    });
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
 * @param body 搜索參數 - Search parameters
 * @param params 查詢參數 - Query parameters
 * @returns Promise<Paged_Subject> 搜索結果
 */
export const SearchSubjects = (
    body: {
        /** 搜索關鍵字 - Search keyword (必填) */
        keyword: string;
        /** 排序規則 - Sort order (可選) */
        sort?: 'match' | 'heat' | 'rank' | 'score';
        /** 篩選條件 - Filter conditions (可選) */
        filter?: {
            /** 條目類型 - Subject types */
            type?: SubjectType[];
            /** 公共標籤 - Meta tags */
            meta_tags?: string[];
            /** 標籤 - Tags */
            tag?: string[];
            /** 播出日期/發售日期 - Air date */
            air_date?: string[];
            /** 評分 - Rating */
            rating?: string[];
            /** 排名 - Rank */
            rank?: string[];
            /** 是否包含NSFW - Include NSFW */
            nsfw?: boolean;
        };
    },
    params?: {
        /** 每頁數量 - Items per page (可選) */
        limit?: number;
        /** 偏移量 - Offset (可選) */
        offset?: number;
    }
): Promise<Paged_Subject> => {
    return bgmApi.post<Paged_Subject>('/v0/search/subjects', body, { params });
};

// ========== 每日放送 - Calendar ==========

/**
 * 獲取每日放送 - Get Calendar
 * @returns Promise<CalendarItem[]> 每日放送列表
 */
export const GetCalendar = (): Promise<CalendarItem[]> => {
    return bgmApi.get<CalendarItem[]>('/calendar');
};
