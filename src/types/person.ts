// 人物相關類型定義 - Person Related Type Definitions
import { SubjectType, PersonType, BloodType } from './common';

// ========== 基本類型 - Basic Types ==========

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
 * 統計信息 - Statistics (對應 API schema Stat)
 */
export interface Stat {
    /** 評論數 - Comments count */
    comments: number;
    /** 收藏數 - Collections count */
    collects: number;
}

/**
 * 人物信息框項目 - Person Infobox Item
 */
export interface PersonInfoboxItem {
    /** 項目鍵 - Item key */
    key: string;
    /** 項目值 - Item value */
    value: string | PersonInfoboxValue[];
}

/**
 * 人物信息框值 - Person Infobox Value
 */
export interface PersonInfoboxValue {
    /** 值內容 - Value content */
    v: string;
    /** 值鏈接 - Value link */
    k?: string;
}

/**
 * 人物基本信息 - Basic Person Information (對應 API schema Person)
 */
export interface Person {
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
    /** 人物簡介 - Person short summary */
    short_summary: string;
    /** 是否被鎖定 - Is locked */
    locked: boolean;
}

/**
 * 人物詳細信息 - Person Detail Information (對應 API schema PersonDetail)
 */
export interface PersonDetail {
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
    /** 人物簡介 - Person summary */
    summary: string;
    /** 是否被鎖定 - Is locked */
    locked: boolean;
    /** 最後修改時間 - Last modified */
    last_modified: string;
    /** 信息框原始內容 - Raw infobox content */
    infobox?: PersonInfoboxItem[];
    /** 性別 - Gender */
    gender?: string;
    /** 血型 - Blood type */
    blood_type?: BloodType;
    /** 出生年份 - Birth year */
    birth_year?: number;
    /** 出生月份 - Birth month */
    birth_mon?: number;
    /** 出生日期 - Birth day */
    birth_day?: number;
    /** 統計信息 - Statistics */
    stat: Stat;
}

/**
 * 人物相關角色 - Person Related Character (對應 API schema PersonCharacter)
 */
export interface PersonCharacter {
    /** 角色 ID - Character ID */
    id: number;
    /** 角色名稱 - Character name */
    name: string;
    /** 角色類型 - Character type */
    type: number;
    /** 角色圖片 - Character images */
    images?: PersonImages;
    /** 條目 ID - Subject ID */
    subject_id: number;
    /** 條目類型 - Subject type */
    subject_type: SubjectType;
    /** 條目名稱 - Subject name */
    subject_name: string;
    /** 條目中文名稱 - Subject Chinese name */
    subject_name_cn: string;
    /** 人物與角色的關係 - Person-character relationship */
    staff?: string;
}

/**
 * 分頁人物響應 - Paged Person Response (對應 API schema Paged_Person)
 */
export interface Paged_Person {
    /** 總數 - Total count */
    total: number;
    /** 每頁限制 - Items per page limit */
    limit: number;
    /** 偏移量 - Offset */
    offset: number;
    /** 人物數據 - Person data */
    data: Person[];
}

/**
 * 人物職業 - Person Career (對應 API schema PersonCareer)
 */
export type PersonCareer = 'producer' | 'mangaka' | 'artist' | 'seiyu' | 'writer' | 'illustrator' | 'actor';
