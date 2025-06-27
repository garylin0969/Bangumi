// 條目相關類型定義 - Subject Related Type Definitions
import { Images, Rating, Collection, Tag, SubjectType, PersonType, CharacterType } from './common';
import { Episode } from './episode';
import { Person } from './person';

// ========== 基本類型 - Basic Types ==========

/**
 * 條目基本信息 - Basic Subject Information (對應 API schema Subject)
 */
export interface Subject {
    /** 條目 ID - Subject ID */
    id: number;
    /** 條目類型 - Subject type */
    type: SubjectType;
    /** 條目名稱 - Subject name */
    name: string;
    /** 條目中文名稱 - Subject Chinese name */
    name_cn: string;
    /** 條目簡介 - Subject summary */
    summary: string;
    /** 是否為成人內容 - Is NSFW content */
    nsfw: boolean;
    /** 是否被鎖定 - Is locked */
    locked: boolean;
    /** 首播/發售日期 - Air/Release date */
    date?: string;
    /** 平台信息 - Platform information */
    platform?: string;
    /** 圖片信息 - Images */
    images?: Images;
    /** 信息框原始內容 - Raw infobox content */
    infobox?: WikiV0[];
    /** 總集數 - Total episodes */
    eps?: number;
    /** 總話數 - Total volumes */
    volumes?: number;
    /** 收藏統計 - Collection statistics */
    collection?: Collection;
    /** 評分信息 - Rating information */
    rating?: Rating;
    /** 標籤列表 - Tags */
    tags?: Tag[];
}

/**
 * Wiki信息框項目 - Wiki Infobox Item (對應 API schema WikiV0)
 */
export interface WikiV0 {
    /** 項目鍵 - Item key */
    key: string;
    /** 項目值 - Item value */
    value: string | WikiValue[];
}

/**
 * Wiki值 - Wiki Value
 */
export interface WikiValue {
    /** 值內容 - Value content */
    v: string;
    /** 值鏈接 - Value link */
    k?: string;
}

/**
 * v0版本條目關聯 - v0 Subject Relation (對應 API schema v0_subject_relation)
 */
export interface v0_subject_relation {
    /** 條目 ID - Subject ID */
    id: number;
    /** 條目類型 - Subject type */
    type: number;
    /** 條目名稱 - Subject name */
    name: string;
    /** 條目中文名稱 - Subject Chinese name */
    name_cn: string;
    /** 條目圖片 - Subject images */
    images?: Images;
    /** 關聯類型 - Relation type */
    relation: string;
}

/**
 * 相關角色 - Related Character (對應 API schema RelatedCharacter)
 */
export interface RelatedCharacter {
    /** 角色 ID - Character ID */
    id: number;
    /** 角色名稱 - Character name */
    name: string;
    /** 角色類型 - Character type */
    type: CharacterType;
    /** 角色圖片 - Character images */
    images?: PersonImages;
    /** 關聯類型 - Relation type */
    relation: string;
    /** 聲優列表 - Voice actors */
    actors?: Person[];
}

/**
 * 人物圖片 - Person Images (對應 API schema PersonImages)
 */
export interface PersonImages {
    /** 大圖 - Large image */
    large: string;
    /** 中圖 - Medium image */
    medium: string;
    /** 小圖 - Small image */
    small: string;
    /** 格子圖 - Grid image */
    grid: string;
}

/**
 * 相關人物 - Related Person (對應 API schema RelatedPerson)
 */
export interface RelatedPerson {
    /** 人物 ID - Person ID */
    id: number;
    /** 人物名稱 - Person name */
    name: string;
    /** 人物類型 - Person type */
    type: PersonType;
    /** 人物職業 - Person career */
    career: PersonCareer[];
    /** 人物圖片 - Person images */
    images?: PersonImages;
    /** 關聯類型 - Relation type */
    relation: string;
    /** 參與章節/曲目 - Participated episodes */
    eps: string;
}

/**
 * 人物職業 - Person Career (對應 API schema PersonCareer)
 */
export enum PersonCareer {
    Producer = 'producer',
    Mangaka = 'mangaka',
    Artist = 'artist',
    Seiyu = 'seiyu',
    Writer = 'writer',
    Illustrator = 'illustrator',
    Actor = 'actor',
}

/**
 * 分頁條目響應 - Paged Subject Response (對應 API schema Paged_Subject)
 */
export interface Paged_Subject {
    /** 總數 - Total count */
    total: number;
    /** 每頁限制 - Items per page limit */
    limit: number;
    /** 偏移量 - Offset */
    offset: number;
    /** 條目數據 - Subject data */
    data: Subject[];
}

// ========== 條目分類 - Subject Categories ==========

/**
 * 書籍分類 - Book Category (對應 API schema SubjectBookCategory)
 */
export enum SubjectBookCategory {
    Comic = 1001,
    Novel = 1002,
    Artbook = 1003,
    Game = 1004,
    Guide = 1005,
    Magazine = 1006,
    Light_Novel = 1007,
    Other = 1999,
}

/**
 * 動畫分類 - Anime Category (對應 API schema SubjectAnimeCategory)
 */
export enum SubjectAnimeCategory {
    TV = 2001,
    OVA = 2002,
    Movie = 2003,
    Web = 2004,
    TV_Special = 2005,
    Other = 2999,
}

/**
 * 遊戲分類 - Game Category (對應 API schema SubjectGameCategory)
 */
export enum SubjectGameCategory {
    PC = 4001,
    Mac = 4002,
    PS = 4003,
    PS2 = 4004,
    PS3 = 4005,
    PS4 = 4006,
    PS5 = 4007,
    PSP = 4008,
    PSV = 4009,
    Xbox = 4010,
    Xbox360 = 4011,
    XboxOne = 4012,
    XboxSeriesX = 4013,
    WII = 4014,
    WiiU = 4015,
    Switch = 4016,
    GB = 4017,
    GBA = 4018,
    GBC = 4019,
    NDS = 4020,
    N3DS = 4021,
    DC = 4022,
    MD = 4023,
    SS = 4024,
    FC = 4025,
    SFC = 4026,
    N64 = 4027,
    NGC = 4028,
    PCE = 4029,
    WS = 4030,
    NGP = 4031,
    iOS = 4032,
    Android = 4033,
    Arcade = 4034,
    MSX = 4035,
    DOS = 4036,
    Linux = 4037,
    C64 = 4038,
    Amiga = 4039,
    Atari2600 = 4040,
    Browser = 4041,
    Other = 4999,
}

/**
 * 三次元分類 - Real Category (對應 API schema SubjectRealCategory)
 */
export enum SubjectRealCategory {
    JP = 6001,
    EN = 6002,
    CN = 6003,
    Other = 6999,
}

/**
 * 條目分類聯合類型 - Subject Category Union
 */
export type SubjectCategory = SubjectBookCategory | SubjectAnimeCategory | SubjectGameCategory | SubjectRealCategory;

// ========== 廢棄的類型定義 (保持向後兼容) - Deprecated Types ==========

/**
 * @deprecated 使用 Subject 替代
 */
export interface SubjectDetail extends Subject {
    /** 條目關聯 - Subject relations */
    relations?: SubjectRelation[];
    /** 角色列表 - Characters */
    characters?: SubjectCharacter[];
    /** 人物列表 - Persons */
    persons?: SubjectPerson[];
    /** 章節列表 - Episodes */
    episodes?: Episode[];
}

/**
 * @deprecated 使用 WikiV0 替代
 */
export interface InfoboxItem {
    /** 項目鍵 - Item key */
    key: string;
    /** 項目值 - Item value */
    value: string | InfoboxValue[];
}

/**
 * @deprecated 使用 WikiValue 替代
 */
export interface InfoboxValue {
    /** 值內容 - Value content */
    v: string;
    /** 值鏈接 - Value link */
    k?: string;
}

/**
 * @deprecated 使用 v0_subject_relation 替代
 */
export interface SubjectRelation {
    /** 關聯條目 ID - Related subject ID */
    id: number;
    /** 關聯類型 - Relation type */
    type: number;
    /** 關聯條目名稱 - Related subject name */
    name: string;
    /** 關聯條目中文名稱 - Related subject Chinese name */
    name_cn: string;
    /** 關聯條目圖片 - Related subject image */
    images?: Images;
    /** 關聯描述 - Relation description */
    relation: string;
}

/**
 * @deprecated 使用 RelatedCharacter 替代
 */
export interface SubjectCharacter {
    /** 角色 ID - Character ID */
    id: number;
    /** 角色名稱 - Character name */
    name: string;
    /** 角色類型 - Character type */
    type: number;
    /** 角色圖片 - Character images */
    images?: Images;
    /** 角色在條目中的重要性 - Character role in subject */
    relation: string;
    /** 聲優列表 - Voice actors */
    actors?: SubjectPerson[];
}

/**
 * @deprecated 使用 RelatedPerson 替代
 */
export interface SubjectPerson {
    /** 人物 ID - Person ID */
    id: number;
    /** 人物名稱 - Person name */
    name: string;
    /** 人物類型 - Person type */
    type: number;
    /** 人物圖片 - Person images */
    images?: Images;
    /** 人物職位 - Person position */
    career: string[];
    /** 人物在條目中的職位 - Person relation in subject */
    relation: string;
}

// ========== 其他輔助類型 - Helper Types ==========

/**
 * 每日放送中的條目 - Calendar Subject
 */
export interface CalendarSubject {
    /** 條目 ID - Subject ID */
    id: number;
    /** 條目 URL - Subject URL */
    url: string;
    /** 條目類型 - Subject type */
    type: SubjectType;
    /** 條目名稱 - Subject name */
    name: string;
    /** 條目中文名稱 - Subject Chinese name */
    name_cn: string;
    /** 條目簡介 - Subject summary */
    summary: string;
    /** 播出日期 - Air date */
    air_date: string;
    /** 播出星期 - Air weekday */
    air_weekday: number;
    /** 圖片信息 - Images */
    images: Images;
    /** 總集數 - Total episodes */
    eps: number;
    /** 集數統計 - Episodes count */
    eps_count: number;
    /** 評分信息 - Rating information */
    rating: Rating;
    /** 排名 - Rank */
    rank: number;
    /** 收藏統計 - Collection statistics */
    collection: Collection;
}

/**
 * 每日放送項目 - Calendar Item
 */
export interface CalendarItem {
    /** 星期信息 - Weekday information */
    weekday: {
        /** 英文 - English */
        en: string;
        /** 中文 - Chinese */
        cn: string;
        /** 日文 - Japanese */
        ja: string;
        /** 星期數字 - Weekday number */
        id: number;
    };
    /** 該日播出的條目列表 - Items airing on this day */
    items: CalendarSubject[];
}

/**
 * 條目統計 - Subject Statistics
 */
export interface SubjectStats {
    /** 條目 ID - Subject ID */
    subject_id: number;
    /** 評論數 - Comments count */
    comments: number;
    /** 收藏數 - Collections count */
    collects: number;
}

/**
 * 條目推薦 - Subject Recommendation
 */
export interface SubjectRecommendation {
    /** 推薦的條目 - Recommended subject */
    subject: Subject;
    /** 推薦分數 - Recommendation score */
    score: number;
    /** 推薦理由 - Recommendation reason */
    reason?: string;
}

/**
 * 條目索引 - Subject Index
 */
export interface SubjectIndex {
    /** 索引 ID - Index ID */
    id: number;
    /** 索引標題 - Index title */
    title: string;
    /** 索引描述 - Index description */
    desc: string;
    /** 創建者 - Creator */
    creator: {
        /** 用戶名 - Username */
        username: string;
        /** 昵稱 - Nickname */
        nickname: string;
    };
    /** 創建時間 - Created at */
    created_at: string;
    /** 更新時間 - Updated at */
    updated_at: string;
    /** 條目數量 - Subject count */
    total: number;
    /** 條目列表 - Subject list */
    subjects?: IndexSubject[];
}

/**
 * 索引中的條目 - Index Subject
 */
export interface IndexSubject {
    /** 條目 ID - Subject ID */
    id: number;
    /** 條目類型 - Subject type */
    type: SubjectType;
    /** 條目名稱 - Subject name */
    name: string;
    /** 條目中文名稱 - Subject Chinese name */
    name_cn: string;
    /** 條目圖片 - Subject image */
    image: string;
    /** 添加時間 - Added at */
    added_at: string;
    /** 評論 - Comment */
    comment?: string;
}
