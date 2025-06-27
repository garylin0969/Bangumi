// 收藏相關類型定義 - Collection Related Types
import { Pagination, CollectionType, SubjectType } from './common';
import { Subject } from './subject';
import { User } from './user';

/**
 * 收藏項目 - Collection Item
 */
export interface CollectionItem {
    /** 收藏 ID - Collection ID */
    id: number;
    /** 條目 ID - Subject ID */
    subject_id: number;
    /** 條目 - Subject */
    subject: Subject;
    /** 收藏類型 - Collection type */
    type: CollectionType;
    /** 用戶評分 - User rating */
    rating: number;
    /** 用戶評論 - User comment */
    comment: string;
    /** 用戶標籤 - User tags */
    tags: string[];
    /** 是否私有 - Is private */
    private: boolean;
    /** 創建時間 - Created at */
    created_at: string;
    /** 更新時間 - Updated at */
    updated_at: string;
    /** 章節進度 - Episode progress */
    ep_status?: number;
    /** 話數進度 - Volume progress */
    vol_status?: number;
}

/**
 * 收藏統計 - Collection Statistics
 */
export interface CollectionStats {
    /** 想看/想玩 - Wish to watch/play */
    wish: number;
    /** 看過/玩過 - Completed */
    collect: number;
    /** 在看/在玩 - Currently watching/playing */
    doing: number;
    /** 擱置 - On hold */
    on_hold: number;
    /** 抛弃 - Dropped */
    dropped: number;
}

/**
 * 收藏列表響應 - Collection List Response
 */
export interface CollectionListResponse extends Pagination {
    /** 收藏數據 - Collection data */
    data: CollectionItem[];
}

/**
 * 收藏詳情 - Collection Detail
 */
export interface CollectionDetail extends CollectionItem {
    /** 收藏者 - Collector */
    user: User;
    /** 收藏歷史 - Collection history */
    history?: CollectionHistoryItem[];
}

/**
 * 收藏歷史項目 - Collection History Item
 */
export interface CollectionHistoryItem {
    /** 歷史 ID - History ID */
    id: number;
    /** 操作類型 - Action type */
    action: 'create' | 'update' | 'delete';
    /** 舊狀態 - Old status */
    old_status?: CollectionType;
    /** 新狀態 - New status */
    new_status?: CollectionType;
    /** 舊評分 - Old rating */
    old_rating?: number;
    /** 新評分 - New rating */
    new_rating?: number;
    /** 操作時間 - Action time */
    created_at: string;
}

/**
 * 收藏請求 - Collection Request
 */
export interface CollectionRequest {
    /** 收藏類型 - Collection type */
    type: CollectionType;
    /** 用戶評分 - User rating */
    rating?: number;
    /** 用戶評論 - User comment */
    comment?: string;
    /** 用戶標籤 - User tags */
    tags?: string[];
    /** 是否私有 - Is private */
    private?: boolean;
    /** 章節進度 - Episode progress */
    ep_status?: number;
    /** 話數進度 - Volume progress */
    vol_status?: number;
}

/**
 * 收藏批量操作請求 - Batch Collection Request
 */
export interface BatchCollectionRequest {
    /** 條目 ID 列表 - Subject ID list */
    subject_ids: number[];
    /** 收藏類型 - Collection type */
    type: CollectionType;
    /** 是否私有 - Is private */
    private?: boolean;
}

/**
 * 收藏批量操作響應 - Batch Collection Response
 */
export interface BatchCollectionResponse {
    /** 成功的條目 ID - Successful subject IDs */
    success: number[];
    /** 失敗的條目 ID 及原因 - Failed subject IDs with reasons */
    failed: {
        /** 條目 ID - Subject ID */
        subject_id: number;
        /** 失敗原因 - Failure reason */
        reason: string;
    }[];
}

/**
 * 收藏過濾器 - Collection Filter
 */
export interface CollectionFilter {
    /** 條目類型 - Subject type */
    subject_type?: SubjectType;
    /** 收藏類型 - Collection type */
    type?: CollectionType;
    /** 標籤 - Tags */
    tags?: string[];
    /** 評分範圍 - Rating range */
    rating?: {
        /** 最低評分 - Minimum rating */
        min?: number;
        /** 最高評分 - Maximum rating */
        max?: number;
    };
    /** 排序方式 - Sort order */
    sort?: 'updated_at' | 'created_at' | 'rating' | 'name';
    /** 排序方向 - Sort direction */
    order?: 'asc' | 'desc';
}

/**
 * 收藏導出 - Collection Export
 */
export interface CollectionExport {
    /** 導出格式 - Export format */
    format: 'json' | 'csv' | 'xml';
    /** 包含字段 - Include fields */
    fields?: string[];
    /** 過濾器 - Filter */
    filter?: CollectionFilter;
}
