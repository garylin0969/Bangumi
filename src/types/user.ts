// 用戶相關類型定義 - User Related Type Definitions
import { Images, SubjectType, CollectionType } from './common';
import { Subject } from './subject';

/**
 * 用戶基本信息 - Basic User Information
 */
export interface User {
    /** 用戶 ID - User ID */
    id: number;
    /** 用戶名 - Username */
    username: string;
    /** 昵稱 - Nickname */
    nickname: string;
    /** 頭像 - Avatar */
    avatar: {
        /** 大頭像 - Large avatar */
        large: string;
        /** 中頭像 - Medium avatar */
        medium: string;
        /** 小頭像 - Small avatar */
        small: string;
    };
    /** 簽名 - User signature */
    sign: string;
    /** 註冊日期 - Join date */
    joindate: string;
    /** 用戶組 - User group */
    usergroup?: number;
    /** 用戶狀態 - User status */
    status?: {
        /** 最後在線時間 - Last online */
        lastpost: string;
        /** 是否在線 - Is online */
        online: boolean;
    };
    /** 統計信息 - Statistics */
    stats?: UserStats;
    /** 郵箱地址 (僅當前用戶可見) - Email (only visible to current user) */
    email?: string;
    /** 註冊時間 (僅當前用戶可見) - Registration time (only visible to current user) */
    reg_time?: string;
    /** 時區偏移 (僅當前用戶可見) - Time offset (only visible to current user) */
    time_offset?: number;
}

/**
 * 用戶統計 - User Statistics
 */
export interface UserStats {
    /** 想看數量 - Wish count */
    wish: number;
    /** 看過數量 - Completed count */
    collect: number;
    /** 在看數量 - Doing count */
    doing: number;
    /** 擱置數量 - On hold count */
    on_hold: number;
    /** 抛弃數量 - Dropped count */
    dropped: number;
}

/**
 * 用戶條目收藏 - User Subject Collection
 */
export interface UserCollection {
    /** 條目 ID - Subject ID */
    subject_id: number;
    /** 條目類型 - Subject type */
    subject_type: SubjectType;
    /** 收藏類型 - Collection type */
    type: CollectionType;
    /** 條目名稱 - Subject name */
    name: string;
    /** 條目中文名稱 - Subject Chinese name */
    name_cn: string;
    /** 條目圖片 - Subject images */
    images: Images;
    /** 用戶評論 - User comment */
    comment: string;
    /** 用戶標籤 - User tags */
    tags: string[];
    /** 用戶評分 - User rating */
    rating: number;
    /** 是否私有 - Is private */
    private: boolean;
    /** 更新時間 - Updated at */
    updated_at?: string;
    /** 創建時間 - Created at */
    created_at?: string;
    /** 章節進度 - Episode progress */
    ep_status?: number;
    /** 話數進度 - Volume progress */
    vol_status?: number;
}

/**
 * 用戶條目收藏 (API返回格式) - User Subject Collection (API Response Format)
 */
export interface UserSubjectCollection {
    /** 條目 - Subject */
    subject: Subject;
    /** 收藏類型 - Collection type */
    type: CollectionType;
    /** 用戶評分 - User rating */
    rate: number;
    /** 用戶評論 - User comment */
    comment: string;
    /** 用戶標籤 - User tags */
    tags: string[];
    /** 是否私有 - Is private */
    private: boolean;
    /** 更新時間 - Updated at */
    updated_at: string;
    /** 章節進度 - Episode progress */
    ep_status?: number;
    /** 話數進度 - Volume progress */
    vol_status?: number;
}

/**
 * 用戶條目收藏修改數據 - User Subject Collection Modify Payload
 */
export interface UserSubjectCollectionModifyPayload {
    /** 收藏類型 - Collection type */
    type?: CollectionType;
    /** 用戶評分 - User rating */
    rate?: number;
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
 * 分頁用戶收藏響應 - Paged User Collection Response
 */
export interface Paged_UserCollection {
    /** 總數 - Total count */
    total: number;
    /** 每頁限制 - Items per page limit */
    limit: number;
    /** 偏移量 - Offset */
    offset: number;
    /** 用戶收藏數據 - User collection data */
    data: UserCollection[];
}

/**
 * 章節收藏類型 - Episode Collection Type
 */
export enum EpisodeCollectionType {
    /** 未收藏 - Not collected */
    None = 0,
    /** 想看 - Want to watch */
    Wish = 1,
    /** 看過 - Watched */
    Collect = 2,
    /** 抛弃 - Dropped */
    Drop = 3,
}

/**
 * 用戶章節收藏 - User Episode Collection
 */
export interface UserEpisodeCollection {
    /** 章節 - Episode */
    episode: {
        /** 章節 ID - Episode ID */
        id: number;
    };
    /** 收藏類型 - Collection type */
    type: EpisodeCollectionType;
}

/**
 * 用戶角色收藏 - User Character Collection
 */
export interface UserCharacterCollection {
    /** 角色 ID - Character ID */
    id: number;
    /** 角色名稱 - Character name */
    name: string;
    /** 角色類型 - Character type */
    type: number;
    /** 角色圖片 - Character images */
    images?: Images;
    /** 收藏時間 - Created at */
    created_at: string;
}

/**
 * 分頁用戶角色收藏響應 - Paged User Character Collection Response
 */
export interface Paged_UserCharacterCollection {
    /** 總數 - Total count */
    total: number;
    /** 每頁限制 - Items per page limit */
    limit: number;
    /** 偏移量 - Offset */
    offset: number;
    /** 用戶角色收藏數據 - User character collection data */
    data: UserCharacterCollection[];
}

/**
 * 用戶人物收藏 - User Person Collection
 */
export interface UserPersonCollection {
    /** 人物 ID - Person ID */
    id: number;
    /** 人物名稱 - Person name */
    name: string;
    /** 人物類型 - Person type */
    type: number;
    /** 人物職業 - Person career */
    career: string[];
    /** 人物圖片 - Person images */
    images?: Images;
    /** 收藏時間 - Created at */
    created_at: string;
}

/**
 * 分頁用戶人物收藏響應 - Paged User Person Collection Response
 */
export interface Paged_UserPersonCollection {
    /** 總數 - Total count */
    total: number;
    /** 每頁限制 - Items per page limit */
    limit: number;
    /** 偏移量 - Offset */
    offset: number;
    /** 用戶人物收藏數據 - User person collection data */
    data: UserPersonCollection[];
}

/**
 * 用戶章節進度 - User Episode Progress
 */
export interface UserEpisodeProgress {
    /** 條目 ID - Subject ID */
    subject_id: number;
    /** 章節 ID - Episode ID */
    episode_id: number;
    /** 觀看狀態 - Episode status */
    type: number;
    /** 更新時間 - Updated at */
    updated_at: string;
}

/**
 * 用戶好友 - User Friend
 */
export interface UserFriend {
    /** 用戶 - User */
    user: User;
    /** 關係類型 - Relationship type */
    relation: 'friend' | 'follower' | 'following';
    /** 關係建立時間 - Relationship created at */
    created_at: string;
}

/**
 * 用戶好友響應 - User Friends Response
 */
export interface UserFriendsResponse {
    /** 總數 - Total count */
    total: number;
    /** 每頁限制 - Items per page limit */
    limit: number;
    /** 偏移量 - Offset */
    offset: number;
    /** 好友數據 - Friends data */
    data: UserFriend[];
}

/**
 * 用戶索引 - User Index
 */
export interface UserIndex {
    /** 索引 ID - Index ID */
    id: number;
    /** 索引標題 - Index title */
    title: string;
    /** 索引描述 - Index description */
    desc: string;
    /** 創建時間 - Created at */
    created_at: string;
    /** 更新時間 - Updated at */
    updated_at: string;
    /** 條目數量 - Subject count */
    total: number;
}

/**
 * 用戶索引響應 - User Indices Response
 */
export interface UserIndicesResponse {
    /** 總數 - Total count */
    total: number;
    /** 每頁限制 - Items per page limit */
    limit: number;
    /** 偏移量 - Offset */
    offset: number;
    /** 索引數據 - Index data */
    data: UserIndex[];
}
