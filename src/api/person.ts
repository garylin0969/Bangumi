import { Person, PersonDetail, PersonSubject, PersonCharacter, PersonCollection, PersonSearchResult } from '@/types';
import bgmApi from './bgm-api';

// ========== 人物基本操作 - Basic Person Operations ==========

/**
 * 獲取人物信息 - Get Person Information
 * @param id 人物 ID - Person ID
 * @returns Promise<Person> 人物信息
 */
export const GetPerson = (id: number): Promise<Person> => {
    return bgmApi.get<Person>(`/v0/persons/${id}`);
};

/**
 * 獲取人物詳細信息 - Get Person Detailed Information
 * @param id 人物 ID - Person ID
 * @returns Promise<PersonDetail> 人物詳細信息
 */
export const GetPersonDetail = (id: number): Promise<PersonDetail> => {
    return bgmApi.get<PersonDetail>(`/v0/persons/${id}?responseGroup=large`);
};

/**
 * 獲取多個人物信息 - Get Multiple Persons Information
 * @param ids 人物 ID 列表 - Person ID list
 * @returns Promise<Person[]> 人物信息列表
 */
export const GetPersons = (ids: number[]): Promise<Person[]> => {
    const idsParam = ids.join(',');
    return bgmApi.get<Person[]>(`/v0/persons?ids=${idsParam}`);
};

// ========== 人物關聯內容 - Person Related Content ==========

/**
 * 獲取人物相關角色 - Get Person Related Characters
 * @param id 人物 ID - Person ID
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<PersonCharacter[]> 人物相關角色列表
 */
export const GetPersonCharacters = (id: number, limit?: number, offset?: number): Promise<PersonCharacter[]> => {
    const params = { limit, offset };
    return bgmApi.get<PersonCharacter[]>(`/v0/persons/${id}/characters`, { params });
};

/**
 * 獲取人物相關條目 - Get Person Related Subjects
 * @param id 人物 ID - Person ID
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<PersonSubject[]> 人物相關條目列表
 */
export const GetPersonSubjects = (id: number, limit?: number, offset?: number): Promise<PersonSubject[]> => {
    const params = { limit, offset };
    return bgmApi.get<PersonSubject[]>(`/v0/persons/${id}/subjects`, { params });
};

// ========== 人物搜索 - Person Search ==========

/**
 * 搜索人物 - Search Persons
 * @param keyword 搜索關鍵字 - Search keyword
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<PersonSearchResult> 搜索結果
 */
export const SearchPersons = (keyword: string, limit?: number, offset?: number): Promise<PersonSearchResult> => {
    const params = { keyword, limit, offset };
    return bgmApi.get<PersonSearchResult>(`/v0/search/persons`, { params });
};

/**
 * 高級搜索人物 - Advanced Search Persons
 * @param params 搜索參數 - Search parameters
 * @returns Promise<PersonSearchResult> 搜索結果
 */
export const AdvancedSearchPersons = (params: {
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

// ========== 人物收藏 - Person Collection ==========

/**
 * 收藏人物 - Collect Person
 * @param id 人物 ID - Person ID
 * @param comment 收藏評論 - Collection comment (可選)
 * @returns Promise<void>
 */
export const CollectPerson = (id: number, comment?: string): Promise<void> => {
    const data = { comment };
    return bgmApi.post<void>(`/v0/persons/${id}/collect`, data);
};

/**
 * 取消收藏人物 - Uncollect Person
 * @param id 人物 ID - Person ID
 * @returns Promise<void>
 */
export const UncollectPerson = (id: number): Promise<void> => {
    return bgmApi.delete<void>(`/v0/persons/${id}/collect`);
};

/**
 * 獲取人物收藏狀態 - Get Person Collection Status
 * @param id 人物 ID - Person ID
 * @returns Promise<PersonCollection | null> 收藏信息，如果未收藏則返回 null
 */
export const GetPersonCollectionStatus = (id: number): Promise<PersonCollection | null> => {
    return bgmApi.get<PersonCollection | null>(`/v0/persons/${id}/collect`);
};

// ========== 人物統計 - Person Statistics ==========

/**
 * 獲取熱門人物列表 - Get Popular Persons
 * @param type 人物類型 - Person type (可選)
 * @param career 職業 - Career (可選)
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<Person[]> 熱門人物列表
 */
export const GetPopularPersons = (
    type?: number,
    career?: string,
    limit?: number,
    offset?: number
): Promise<Person[]> => {
    const params = { type, career, limit, offset };
    return bgmApi.get<Person[]>(`/v0/persons/popular`, { params });
};

/**
 * 獲取最新人物列表 - Get Latest Persons
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<Person[]> 最新人物列表
 */
export const GetLatestPersons = (limit?: number, offset?: number): Promise<Person[]> => {
    const params = { limit, offset };
    return bgmApi.get<Person[]>(`/v0/persons/latest`, { params });
};

/**
 * 按職業獲取人物列表 - Get Persons by Career
 * @param career 職業 - Career
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<Person[]> 人物列表
 */
export const GetPersonsByCareer = (career: string, limit?: number, offset?: number): Promise<Person[]> => {
    const params = { career, limit, offset };
    return bgmApi.get<Person[]>(`/v0/persons/career`, { params });
};
