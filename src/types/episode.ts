// 章節相關類型定義 - Episode Related Types
import { EpisodeType, Pagination } from './common';

/**
 * 章節基本信息 - Basic Episode Information
 */
export interface Episode {
    /** 章節 ID - Episode ID */
    id: number;
    /** 章節類型 - Episode type */
    type: EpisodeType;
    /** 章節名稱 - Episode name */
    name: string;
    /** 章節中文名稱 - Episode Chinese name */
    name_cn: string;
    /** 章節排序 - Episode sort order */
    sort: number;
    /** 章節集數 - Episode number */
    ep: number;
    /** 播出日期 - Air date */
    airdate: string;
    /** 評論數 - Comment count */
    comment: number;
    /** 時長 - Duration */
    duration: string;
    /** 章節描述 - Episode description */
    desc: string;
    /** 光盤編號 - Disc number */
    disc?: number;
    /** 章節狀態 - Episode status */
    status?: string;
    /** 條目 ID - Subject ID */
    subject_id?: number;
}

/**
 * 章節詳細信息 - Detailed Episode Information
 */
export interface EpisodeDetail extends Episode {
    /** 章節評論 - Episode comments */
    comments?: EpisodeComment[];
    /** 章節進度 - Episode progress */
    progress?: EpisodeProgress;
}

/**
 * 章節評論 - Episode Comment
 */
export interface EpisodeComment {
    /** 評論 ID - Comment ID */
    id: number;
    /** 評論內容 - Comment content */
    content: string;
    /** 評論者 - Commenter */
    user: {
        /** 用戶 ID - User ID */
        id: number;
        /** 用戶名 - Username */
        username: string;
        /** 昵稱 - Nickname */
        nickname: string;
        /** 頭像 - Avatar */
        avatar: string;
    };
    /** 評論時間 - Comment time */
    created_at: string;
    /** 評分 - Rating */
    rating?: number;
}

/**
 * 章節進度 - Episode Progress
 */
export interface EpisodeProgress {
    /** 章節 ID - Episode ID */
    episode_id: number;
    /** 觀看狀態 - Watch status */
    status: EpisodeWatchStatus;
    /** 更新時間 - Updated at */
    updated_at: string;
}

/**
 * 章節觀看狀態 - Episode Watch Status
 */
export enum EpisodeWatchStatus {
    /** 未看 - Not watched */
    NotWatched = 0,
    /** 想看 - Want to watch */
    Wish = 1,
    /** 看過 - Watched */
    Watched = 2,
    /** 抛弃 - Dropped */
    Dropped = 3,
}

/**
 * 章節列表響應 - Episodes Response
 */
export interface EpisodesResponse extends Pagination {
    /** 章節數據 - Episode data */
    data: Episode[];
}

/**
 * 章節搜索結果 - Episode Search Result
 */
export interface EpisodeSearchResult {
    /** 搜索結果總數 - Total search results */
    results: number;
    /** 章節列表 - Episode list */
    list: Episode[];
}
