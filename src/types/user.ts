// 用戶相關類型定義 - User Related Types
import { Images, Pagination, CollectionType, SubjectType } from './common';

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
}

/**
 * 用戶統計信息 - User Statistics
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
 * 用戶收藏項目 - User Collection Item
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
 * 用戶收藏列表響應 - User Collections Response
 */
export interface UserCollectionsResponse extends Pagination {
    /** 用戶收藏數據 - User collection data */
    data: UserCollection[];
}

/**
 * 用戶收藏統計 - User Collection Statistics
 */
export interface UserCollectionStats {
    /** 按類型統計 - Statistics by type */
    type: {
        /** 想看 - Wish */
        wish: number;
        /** 看過 - Completed */
        collect: number;
        /** 在看 - Doing */
        doing: number;
        /** 擱置 - On hold */
        on_hold: number;
        /** 抛弃 - Dropped */
        dropped: number;
    };
    /** 按條目類型統計 - Statistics by subject type */
    subject_type: {
        /** 書籍 - Book */
        book: number;
        /** 動畫 - Anime */
        anime: number;
        /** 音樂 - Music */
        music: number;
        /** 遊戲 - Game */
        game: number;
        /** 三次元 - Real */
        real: number;
    };
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
 * 用戶好友 - User Friend/Follower
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
 * 用戶好友列表響應 - User Friends Response
 */
export interface UserFriendsResponse extends Pagination {
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
 * 用戶索引列表響應 - User Indices Response
 */
export interface UserIndicesResponse extends Pagination {
    /** 索引數據 - Index data */
    data: UserIndex[];
}
