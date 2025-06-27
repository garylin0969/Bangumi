// 人物相關類型定義 - Person Related Types
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
    images: Images;
    /** 人物簡介 - Person summary */
    summary: string;
    /** 是否被鎖定 - Is locked */
    locked: boolean;
    /** 信息框原始內容 - Raw infobox content */
    infobox?: PersonInfoboxItem[];
    /** 統計信息 - Statistics */
    stat?: PersonStats;
}

/**
 * 人物詳細信息 - Detailed Person Information
 */
export interface PersonDetail extends Person {
    /** 相關條目 - Related subjects */
    subjects?: PersonSubject[];
    /** 相關角色 - Related characters */
    characters?: PersonCharacter[];
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
 * 人物統計信息 - Person Statistics
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
    images: Images;
    /** 條目 ID - Subject ID */
    subject_id: number;
    /** 條目名稱 - Subject name */
    subject_name: string;
    /** 條目中文名稱 - Subject Chinese name */
    subject_name_cn: string;
    /** 人物與角色的關係 - Person-character relationship */
    staff: string;
}

/**
 * 人物收藏信息 - Person Collection Info
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
