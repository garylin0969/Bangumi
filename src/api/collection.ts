// 收藏相關 API - Collection Related API
import {
    CollectionItem,
    CollectionDetail,
    CollectionListResponse,
    CollectionRequest,
    BatchCollectionRequest,
    BatchCollectionResponse,
    CollectionFilter,
    CollectionExport,
} from '@/types';
import bgmApi from './bgm-api';

// ========== 收藏基本操作 - Basic Collection Operations ==========

/**
 * 獲取條目收藏狀態 - Get Subject Collection Status
 * @param subject_id 條目 ID - Subject ID
 * @returns Promise<CollectionItem | null> 收藏信息，如果未收藏則返回 null
 */
export const GetSubjectCollectionStatus = (subject_id: number): Promise<CollectionItem | null> => {
    return bgmApi.get<CollectionItem | null>(`/v0/me/collections/${subject_id}`);
};

/**
 * 添加/更新條目收藏 - Add/Update Subject Collection
 * @param subject_id 條目 ID - Subject ID
 * @param data 收藏數據 - Collection data
 * @returns Promise<CollectionItem> 收藏信息
 */
export const UpdateSubjectCollection = (subject_id: number, data: CollectionRequest): Promise<CollectionItem> => {
    return bgmApi.post<CollectionItem>(`/v0/me/collections/${subject_id}`, data);
};

/**
 * 刪除條目收藏 - Delete Subject Collection
 * @param subject_id 條目 ID - Subject ID
 * @returns Promise<void>
 */
export const DeleteSubjectCollection = (subject_id: number): Promise<void> => {
    return bgmApi.delete<void>(`/v0/me/collections/${subject_id}`);
};

/**
 * 獲取收藏詳情 - Get Collection Detail
 * @param subject_id 條目 ID - Subject ID
 * @returns Promise<CollectionDetail> 收藏詳情
 */
export const GetCollectionDetail = (subject_id: number): Promise<CollectionDetail> => {
    return bgmApi.get<CollectionDetail>(`/v0/me/collections/${subject_id}?responseGroup=large`);
};

// ========== 批量收藏操作 - Batch Collection Operations ==========

/**
 * 批量添加收藏 - Batch Add Collections
 * @param data 批量收藏數據 - Batch collection data
 * @returns Promise<BatchCollectionResponse> 批量操作響應
 */
export const BatchAddCollections = (data: BatchCollectionRequest): Promise<BatchCollectionResponse> => {
    return bgmApi.post<BatchCollectionResponse>(`/v0/me/collections/batch`, data);
};

/**
 * 批量更新收藏狀態 - Batch Update Collection Status
 * @param collections 收藏更新列表 - Collection update list
 * @returns Promise<BatchCollectionResponse> 批量操作響應
 */
export const BatchUpdateCollections = (
    collections: {
        subject_id: number;
        type: number;
        rating?: number;
        comment?: string;
        private?: boolean;
    }[]
): Promise<BatchCollectionResponse> => {
    const data = { collections };
    return bgmApi.patch<BatchCollectionResponse>(`/v0/me/collections/batch`, data);
};

/**
 * 批量刪除收藏 - Batch Delete Collections
 * @param subject_ids 條目 ID 列表 - Subject ID list
 * @returns Promise<BatchCollectionResponse> 批量操作響應
 */
export const BatchDeleteCollections = (subject_ids: number[]): Promise<BatchCollectionResponse> => {
    const data = { subject_ids };
    return bgmApi.delete<BatchCollectionResponse>(`/v0/me/collections/batch`, { data });
};

// ========== 收藏查詢與過濾 - Collection Query & Filter ==========

/**
 * 獲取收藏列表 - Get Collection List
 * @param filter 過濾條件 - Filter conditions (可選)
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<CollectionListResponse> 收藏列表響應
 */
export const GetCollections = (
    filter?: CollectionFilter,
    limit?: number,
    offset?: number
): Promise<CollectionListResponse> => {
    const params = {
        ...filter,
        limit,
        offset,
    };
    return bgmApi.get<CollectionListResponse>(`/v0/me/collections`, { params });
};

/**
 * 搜索收藏 - Search Collections
 * @param keyword 搜索關鍵字 - Search keyword
 * @param filter 過濾條件 - Filter conditions (可選)
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<CollectionListResponse> 搜索結果
 */
export const SearchCollections = (
    keyword: string,
    filter?: CollectionFilter,
    limit?: number,
    offset?: number
): Promise<CollectionListResponse> => {
    const params = {
        keyword,
        ...filter,
        limit,
        offset,
    };
    return bgmApi.get<CollectionListResponse>(`/v0/me/collections/search`, { params });
};

/**
 * 按標籤獲取收藏 - Get Collections by Tag
 * @param tag 標籤名稱 - Tag name
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<CollectionListResponse> 收藏列表響應
 */
export const GetCollectionsByTag = (tag: string, limit?: number, offset?: number): Promise<CollectionListResponse> => {
    const params = { tag, limit, offset };
    return bgmApi.get<CollectionListResponse>(`/v0/me/collections/tags/${encodeURIComponent(tag)}`, { params });
};

/**
 * 獲取收藏標籤列表 - Get Collection Tags
 * @returns Promise<string[]> 標籤列表
 */
export const GetCollectionTags = (): Promise<string[]> => {
    return bgmApi.get<string[]>(`/v0/me/collections/tags`);
};

// ========== 收藏統計與分析 - Collection Statistics & Analysis ==========

/**
 * 獲取收藏統計 - Get Collection Statistics
 * @returns Promise<{[key: string]: number}> 收藏統計數據
 */
export const GetCollectionStatistics = (): Promise<{ [key: string]: number }> => {
    return bgmApi.get<{ [key: string]: number }>(`/v0/me/collections/statistics`);
};

/**
 * 獲取收藏時間線 - Get Collection Timeline
 * @param year 年份 - Year (可選)
 * @param month 月份 - Month (可選)
 * @returns Promise<CollectionItem[]> 收藏時間線
 */
export const GetCollectionTimeline = (year?: number, month?: number): Promise<CollectionItem[]> => {
    const params = { year, month };
    return bgmApi.get<CollectionItem[]>(`/v0/me/collections/timeline`, { params });
};

/**
 * 獲取收藏趨勢 - Get Collection Trends
 * @param period 時間段 - Time period ('week' | 'month' | 'year')
 * @returns Promise<{date: string; count: number}[]> 收藏趨勢數據
 */
export const GetCollectionTrends = (
    period: 'week' | 'month' | 'year' = 'month'
): Promise<{ date: string; count: number }[]> => {
    const params = { period };
    return bgmApi.get<{ date: string; count: number }[]>(`/v0/me/collections/trends`, { params });
};

// ========== 收藏導入導出 - Collection Import/Export ==========

/**
 * 導出收藏數據 - Export Collection Data
 * @param config 導出配置 - Export configuration
 * @returns Promise<string> 導出數據內容
 */
export const ExportCollections = (config: CollectionExport): Promise<string> => {
    return bgmApi.post<string>(`/v0/me/collections/export`, config);
};

/**
 * 導入收藏數據 - Import Collection Data
 * @param data 導入數據 - Import data
 * @param format 數據格式 - Data format
 * @returns Promise<BatchCollectionResponse> 導入結果
 */
export const ImportCollections = (data: string, format: 'json' | 'csv' | 'xml'): Promise<BatchCollectionResponse> => {
    const requestData = { data, format };
    return bgmApi.post<BatchCollectionResponse>(`/v0/me/collections/import`, requestData);
};

// ========== 收藏同步 - Collection Sync ==========

/**
 * 同步第三方收藏數據 - Sync Third-party Collection Data
 * @param source 數據源 - Data source
 * @param credentials 認證信息 - Credentials
 * @returns Promise<BatchCollectionResponse> 同步結果
 */
export const SyncCollections = (
    source: 'mal' | 'anilist' | 'kitsu',
    credentials: { [key: string]: string }
): Promise<BatchCollectionResponse> => {
    const data = { source, credentials };
    return bgmApi.post<BatchCollectionResponse>(`/v0/me/collections/sync`, data);
};
