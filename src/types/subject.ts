// 條目相關類型定義 - Subject Related Types
import { Images, Rating, Collection, Tag, Pagination, SubjectType, SubjectRelationType } from './common';
import { Episode } from './episode';

/**
 * 條目基本信息 - Basic Subject Information
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
    /** 首播/發售日期 - Air/Release date */
    air_date: string;
    /** 播出星期 - Air weekday (1-7, 1 is Monday) */
    air_weekday: number;
    /** 圖片信息 - Images */
    images: Images;
    /** 收藏統計 - Collection statistics */
    collection: Collection;
    /** 評分信息 - Rating information */
    rating: Rating;
    /** 標籤列表 - Tags */
    tags: Tag[];
    /** 是否為成人內容 - Is NSFW content */
    nsfw?: boolean;
    /** 是否被鎖定 - Is locked */
    locked?: boolean;
    /** 平台信息 - Platform information */
    platform?: string;
    /** 總集數 - Total episodes */
    eps?: number;
    /** 總話數 - Total volumes */
    volumes?: number;
    /** 系列 - Series */
    series?: boolean;
    /** 系列入口 - Series entry */
    series_entry?: number;
    /** 元數據標籤 - Meta tags */
    meta_tags?: string[];
}

/**
 * 條目詳細信息 - Detailed Subject Information
 */
export interface SubjectDetail extends Subject {
    /** 信息框原始內容 - Raw infobox content */
    infobox: InfoboxItem[];
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
 * 信息框項目 - Infobox Item
 */
export interface InfoboxItem {
    /** 項目鍵 - Item key */
    key: string;
    /** 項目值 - Item value */
    value: string | InfoboxValue[];
}

/**
 * 信息框值 - Infobox Value
 */
export interface InfoboxValue {
    /** 值內容 - Value content */
    v: string;
    /** 值鏈接 - Value link */
    k?: string;
}

/**
 * 條目關聯 - Subject Relation
 */
export interface SubjectRelation {
    /** 關聯條目 ID - Related subject ID */
    id: number;
    /** 關聯類型 - Relation type */
    type: SubjectRelationType;
    /** 關聯條目名稱 - Related subject name */
    name: string;
    /** 關聯條目中文名稱 - Related subject Chinese name */
    name_cn: string;
    /** 關聯條目圖片 - Related subject image */
    image: string;
}

/**
 * 條目中的角色 - Character in Subject
 */
export interface SubjectCharacter {
    /** 角色 ID - Character ID */
    id: number;
    /** 角色名稱 - Character name */
    name: string;
    /** 角色類型 - Character type */
    type: number;
    /** 角色圖片 - Character images */
    images: Images;
    /** 角色在條目中的重要性 - Character role in subject */
    relation: string;
    /** 聲優列表 - Voice actors */
    actors?: SubjectPerson[];
}

/**
 * 條目中的人物 - Person in Subject
 */
export interface SubjectPerson {
    /** 人物 ID - Person ID */
    id: number;
    /** 人物名稱 - Person name */
    name: string;
    /** 人物類型 - Person type */
    type: number;
    /** 人物圖片 - Person images */
    images: Images;
    /** 人物職位 - Person position */
    career: string[];
    /** 人物在條目中的職位 - Person relation in subject */
    relation: string;
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
    items: Subject[];
}

/**
 * 搜索結果 - Search Result
 */
export interface SearchResult {
    /** 搜索結果總數 - Total search results */
    results: number;
    /** 條目列表 - Subject list */
    list: Subject[];
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
 * 索引中的條目 - Subject in Index
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
