import { PersonDetail, PersonCharacter, v0_RelatedSubject, Paged_Person } from '@/types';
import bgmApi from './bgm-api';

// ========== 人物搜索 - Person Search ==========

/**
 * 搜索人物 - Search Persons
 * @param body 搜索參數 - Search parameters
 * @param params 查詢參數 - Query parameters
 * @returns Promise<Paged_Person> 搜索結果
 */
export const SearchPersons = (
    body: {
        /** 搜索關鍵字 - Search keyword (必填) */
        keyword: string;
        /** 篩選條件 - Filter conditions (可選) */
        filter?: {
            /** 職業 - Career (可選) */
            career?: string[];
        };
    },
    params?: {
        /** 每頁數量 - Items per page (可選) */
        limit?: number;
        /** 偏移量 - Offset (可選) */
        offset?: number;
    }
): Promise<Paged_Person> => {
    return bgmApi.post<Paged_Person>('/v0/search/persons', body, { params });
};

// ========== 人物基本操作 - Basic Person Operations ==========

/**
 * 獲取人物詳情 - Get Person Detail
 * @param person_id 人物 ID - Person ID
 * @returns Promise<PersonDetail> 人物詳情
 */
export const GetPerson = (person_id: number): Promise<PersonDetail> => {
    return bgmApi.get<PersonDetail>(`/v0/persons/${person_id}`);
};

/**
 * 獲取人物圖片 - Get Person Image
 * @param person_id 人物 ID - Person ID
 * @param type 圖片類型 - Image type
 * @returns Promise<string> 圖片URL (通過302重定向)
 */
export const GetPersonImage = (person_id: number, type: 'small' | 'grid' | 'large' | 'medium'): Promise<string> => {
    return bgmApi.get<string>(`/v0/persons/${person_id}/image`, {
        params: { type },
    });
};

/**
 * 獲取人物相關條目 - Get Person Related Subjects
 * @param person_id 人物 ID - Person ID
 * @returns Promise<v0_RelatedSubject[]> 人物相關條目列表
 */
export const GetPersonSubjects = (person_id: number): Promise<v0_RelatedSubject[]> => {
    return bgmApi.get<v0_RelatedSubject[]>(`/v0/persons/${person_id}/subjects`);
};

/**
 * 獲取人物相關角色 - Get Person Related Characters
 * @param person_id 人物 ID - Person ID
 * @returns Promise<PersonCharacter[]> 人物相關角色列表
 */
export const GetPersonCharacters = (person_id: number): Promise<PersonCharacter[]> => {
    return bgmApi.get<PersonCharacter[]>(`/v0/persons/${person_id}/characters`);
};

// ========== 人物收藏 - Person Collection ==========

/**
 * 收藏人物 - Collect Person
 * @param person_id 人物 ID - Person ID
 * @returns Promise<void>
 */
export const CollectPerson = (person_id: number): Promise<void> => {
    return bgmApi.post<void>(`/v0/persons/${person_id}/collect`);
};

/**
 * 取消收藏人物 - Uncollect Person
 * @param person_id 人物 ID - Person ID
 * @returns Promise<void>
 */
export const UncollectPerson = (person_id: number): Promise<void> => {
    return bgmApi.delete<void>(`/v0/persons/${person_id}/collect`);
};
