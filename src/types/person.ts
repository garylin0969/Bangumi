// 人物相關類型定義 - Person Related Type Definitions
import { Images, PersonType } from './common';

/**
 * 人物基本信息 - Basic Person Information
 */
export interface Person {
    /** 人物 ID - Person ID */
    id: number;
    /** 人物名稱 - Person name */
    name: string;
    /** 人物類型 - Person type */
    type: PersonType;
    /** 人物職業 - Person career */
    career: string[];
    /** 人物圖片 - Person images */
    images?: Images;
    /** 人物簡介 - Person summary */
    short_summary: string;
    /** 是否被鎖定 - Is locked */
    locked: boolean;
}

/**
 * 人物詳細信息 - Person Detail Information
 */
export interface PersonDetail {
    /** 人物 ID - Person ID */
    id: number;
    /** 人物名稱 - Person name */
    name: string;
    /** 人物類型 - Person type */
    type: PersonType;
    /** 人物職業 - Person career */
    career: string[];
    /** 人物圖片 - Person images */
    images?: Images;
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
    blood_type?: number;
    /** 出生年份 - Birth year */
    birth_year?: number;
    /** 出生月份 - Birth month */
    birth_mon?: number;
    /** 出生日期 - Birth day */
    birth_day?: number;
    /** 統計信息 - Statistics */
    stat?: PersonStats;
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
 * 人物統計 - Person Statistics
 */
export interface PersonStats {
    /** 評論數 - Comments count */
    comments: number;
    /** 收藏數 - Collections count */
    collects: number;
}

/**
 * 人物相關條目 - Person Related Subject
 */
export interface PersonSubject {
    /** 條目 ID - Subject ID */
    id: number;
    /** 條目名稱 - Subject name */
    name: string;
    /** 條目中文名稱 - Subject Chinese name */
    name_cn: string;
    /** 條目類型 - Subject type */
    type: number;
    /** 條目圖片 - Subject image */
    image: string;
    /** 人物在條目中的職位 - Person position in subject */
    staff: string;
}

/**
 * 人物相關角色 - Person Related Character
 */
export interface PersonCharacter {
    /** 角色 ID - Character ID */
    id: number;
    /** 角色名稱 - Character name */
    name: string;
    /** 角色類型 - Character type */
    type: number;
    /** 角色圖片 - Character images */
    images?: Images;
    /** 條目 ID - Subject ID */
    subject_id: number;
    /** 條目類型 - Subject type */
    subject_type: number;
    /** 條目名稱 - Subject name */
    subject_name: string;
    /** 條目中文名稱 - Subject Chinese name */
    subject_name_cn: string;
    /** 人物與角色的關係 - Person-character relationship */
    staff?: string;
}

/**
 * 人物收藏 - Person Collection
 */
export interface PersonCollection {
    /** 人物 ID - Person ID */
    person_id: number;
    /** 人物 - Person */
    person: Person;
    /** 收藏時間 - Collected at */
    created_at: string;
    /** 評論 - Comment */
    comment?: string;
}

/**
 * 條目人物關聯 - Subject Person Relation
 */
export interface SubjectPersonRelation {
    /** 人物 ID - Person ID */
    person_id: number;
    /** 條目 ID - Subject ID */
    subject_id: number;
    /** 人物職位 - Person position */
    position: string;
}

/**
 * 人物角色關聯 - Person Character Relation
 */
export interface PersonCharacterRelation {
    /** 人物 ID - Person ID */
    person_id: number;
    /** 條目 ID - Subject ID */
    subject_id: number;
    /** 角色 ID - Character ID */
    character_id: number;
    /** 關係概要 - Relationship summary */
    summary: string;
}

/**
 * 分頁人物響應 - Paged Person Response
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
