// 基礎公共類型定義 - Common Types

/**
 * 圖片信息 - Image Information
 */
export interface Images {
    /** 大圖 - Large image */
    large: string;
    /** 中圖 - Medium image */
    medium: string;
    /** 小圖 - Small image */
    small: string;
    /** 通用圖 - Common image */
    common: string;
    /** 格子圖 - Grid image */
    grid: string;
}

/**
 * 評分統計 - Rating Statistics
 */
export interface Rating {
    /** 總評分 - Total rating */
    total: number;
    /** 各評分等級的統計 - Count by rating level */
    count: {
        1: number;
        2: number;
        3: number;
        4: number;
        5: number;
        6: number;
        7: number;
        8: number;
        9: number;
        10: number;
    };
    /** 平均評分 - Average score */
    score: number;
}

/**
 * 收藏統計 - Collection Statistics
 */
export interface Collection {
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
 * 標籤 - Tag
 */
export interface Tag {
    /** 標籤名稱 - Tag name */
    name: string;
    /** 標籤使用次數 - Tag usage count */
    count: number;
}

/**
 * 分頁信息 - Pagination Info
 */
export interface Pagination {
    /** 總數 - Total count */
    total: number;
    /** 每頁限制 - Items per page limit */
    limit: number;
    /** 偏移量 - Offset */
    offset: number;
}

/**
 * 條目類型 - Subject Type
 */
export enum SubjectType {
    /** 書籍 - Book */
    Book = 1,
    /** 動畫 - Anime */
    Anime = 2,
    /** 音樂 - Music */
    Music = 3,
    /** 遊戲 - Game */
    Game = 4,
    /** 三次元 - Real */
    Real = 6,
}

/**
 * 收藏類型 - Collection Type
 */
export enum CollectionType {
    /** 想看/想玩 - Wish */
    Wish = 1,
    /** 看過/玩過 - Completed */
    Collect = 2,
    /** 在看/在玩 - Doing */
    Doing = 3,
    /** 擱置 - On hold */
    OnHold = 4,
    /** 抛弃 - Dropped */
    Dropped = 5,
}

/**
 * 章節類型 - Episode Type
 */
export enum EpisodeType {
    /** 正篇 - Main episode */
    Main = 0,
    /** 特別篇 - Special episode */
    Special = 1,
    /** 片頭曲 - Opening */
    Opening = 2,
    /** 片尾曲 - Ending */
    Ending = 3,
    /** 預告 - Trailer */
    Trailer = 4,
    /** MAD */
    Mad = 5,
    /** 其他 - Other */
    Other = 6,
}

/**
 * 角色類型 - Character Type
 */
export enum CharacterType {
    /** 角色 - Character */
    Character = 1,
    /** 機體 - Mecha */
    Mecha = 2,
    /** 艦船 - Ship */
    Ship = 3,
    /** 組織 - Organization */
    Organization = 4,
}

/**
 * 人物類型 - Person Type
 */
export enum PersonType {
    /** 個人 - Individual */
    Individual = 1,
    /** 公司 - Company */
    Company = 2,
    /** 組合 - Combination */
    Combination = 3,
}

/**
 * 條目關聯類型 - Subject Relation Type
 */
export enum SubjectRelationType {
    /** 續集 - Sequel */
    Sequel = 1,
    /** 前傳 - Prequel */
    Prequel = 2,
    /** 同系列 - Same series */
    SameSeries = 3,
    /** 番外篇 - Side story */
    SideStory = 4,
    /** 總集篇 - Summary */
    Summary = 5,
    /** 前篇 - Previous */
    Previous = 6,
    /** 後篇 - Next */
    Next = 7,
}

/**
 * 角色在條目中的類型 - Character Role in Subject
 */
export enum CharacterRole {
    /** 主角 - Main character */
    Main = 1,
    /** 配角 - Supporting character */
    Supporting = 2,
    /** 客串 - Guest character */
    Guest = 3,
}

/**
 * 響應包裝器 - Response Wrapper
 */
export interface ApiResponse<T> {
    /** 響應數據 - Response data */
    data: T;
    /** 響應狀態 - Response status */
    status: number;
    /** 響應消息 - Response message */
    message?: string;
}

/**
 * 錯誤響應 - Error Response
 */
export interface ApiError {
    /** 錯誤代碼 - Error code */
    code: number;
    /** 錯誤消息 - Error message */
    message: string;
    /** 錯誤詳情 - Error details */
    details?: string;
}
