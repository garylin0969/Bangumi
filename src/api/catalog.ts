// 目錄相關 API - Catalog/Index Related API
// import { Index, IndexBasicInfo, IndexSubjectAddInfo, IndexSubjectEditInfo } from '@/types';
import bgmApi from './bgm-api';

// ========== 目錄基本操作 - Basic Index Operations ==========

/**
 * 創建新目錄 - Create a new index
 * @returns Promise<any> 新創建的目錄
 */
export const NewIndex = (): Promise<any> => {
    return bgmApi.post<any>('/v0/indices');
};

/**
 * 獲取目錄詳情 - Get Index By ID
 * @param index_id 目錄 ID - Index ID
 * @returns Promise<any> 目錄詳情
 */
export const GetIndex = (index_id: number): Promise<any> => {
    return bgmApi.get<any>(`/v0/indices/${index_id}`);
};

/**
 * 編輯目錄信息 - Edit index's information
 * @param index_id 目錄 ID - Index ID
 * @param data 目錄基本信息 - Index basic info
 * @returns Promise<any> 更新後的目錄
 */
export const EditIndex = (index_id: number, data: any): Promise<any> => {
    return bgmApi.put<any>(`/v0/indices/${index_id}`, data);
};

// ========== 目錄條目管理 - Index Subject Management ==========

/**
 * 獲取目錄條目列表 - Get Index Subjects
 * @param index_id 目錄 ID - Index ID
 * @param type 條目類型 - Subject type (可選)
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<any> 目錄條目列表
 */
export const GetIndexSubjects = (index_id: number, type?: number, limit?: number, offset?: number): Promise<any> => {
    const params = { type, limit, offset };
    return bgmApi.get(`/v0/indices/${index_id}/subjects`, { params });
};

/**
 * 添加條目到目錄 - Add a subject to Index
 * @param index_id 目錄 ID - Index ID
 * @param data 條目添加信息 - Subject add info
 * @returns Promise<void>
 */
export const AddSubjectToIndex = (index_id: number, data: any): Promise<void> => {
    return bgmApi.post<void>(`/v0/indices/${index_id}/subjects`, data);
};

/**
 * 編輯目錄中的條目信息 - Edit subject information in a index
 * @param index_id 目錄 ID - Index ID
 * @param subject_id 條目 ID - Subject ID
 * @param data 條目編輯信息 - Subject edit info
 * @returns Promise<void>
 */
export const EditIndexSubject = (index_id: number, subject_id: number, data: any): Promise<void> => {
    return bgmApi.put<void>(`/v0/indices/${index_id}/subjects/${subject_id}`, data);
};

/**
 * 從目錄中刪除條目 - Delete a subject from a Index
 * @param index_id 目錄 ID - Index ID
 * @param subject_id 條目 ID - Subject ID
 * @returns Promise<void>
 */
export const DeleteSubjectFromIndex = (index_id: number, subject_id: number): Promise<void> => {
    return bgmApi.delete<void>(`/v0/indices/${index_id}/subjects/${subject_id}`);
};

// ========== 目錄收藏 - Index Collection ==========

/**
 * 收藏目錄 - Collect index for current user
 * @param index_id 目錄 ID - Index ID
 * @returns Promise<void>
 */
export const CollectIndex = (index_id: number): Promise<void> => {
    return bgmApi.post<void>(`/v0/indices/${index_id}/collect`);
};

/**
 * 取消收藏目錄 - Uncollect index for current user
 * @param index_id 目錄 ID - Index ID
 * @returns Promise<void>
 */
export const UncollectIndex = (index_id: number): Promise<void> => {
    return bgmApi.delete<void>(`/v0/indices/${index_id}/collect`);
};
