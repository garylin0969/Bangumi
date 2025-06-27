// 角色相關類型定義 - Character Related Types
import { Images, CharacterType, CharacterRole } from './common';

/**
 * 角色基本信息 - Basic Character Information
 */
export interface Character {
    /** 角色 ID - Character ID */
    id: number;
    /** 角色名稱 - Character name */
    name: string;
    /** 角色類型 - Character type */
    type: CharacterType;
    /** 角色圖片 - Character images */
    images: Images;
    /** 角色簡介 - Character summary */
    summary: string;
    /** 是否被鎖定 - Is locked */
    locked: boolean;
    /** 信息框原始內容 - Raw infobox content */
    infobox?: CharacterInfoboxItem[];
    /** 統計信息 - Statistics */
    stat?: CharacterStats;
}

/**
 * 角色詳細信息 - Detailed Character Information
 */
export interface CharacterDetail extends Character {
    /** 相關條目 - Related subjects */
    subjects?: CharacterSubject[];
    /** 相關人物 (聲優等) - Related persons (voice actors, etc.) */
    persons?: CharacterPerson[];
}

/**
 * 角色信息框項目 - Character Infobox Item
 */
export interface CharacterInfoboxItem {
    /** 項目鍵 - Item key */
    key: string;
    /** 項目值 - Item value */
    value: string | CharacterInfoboxValue[];
}

/**
 * 角色信息框值 - Character Infobox Value
 */
export interface CharacterInfoboxValue {
    /** 值內容 - Value content */
    v: string;
    /** 值鏈接 - Value link */
    k?: string;
}

/**
 * 角色統計信息 - Character Statistics
 */
export interface CharacterStats {
    /** 評論數 - Comments count */
    comments: number;
    /** 收藏數 - Collections count */
    collects: number;
}

/**
 * 角色相關條目 - Character Related Subject
 */
export interface CharacterSubject {
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
    /** 角色在條目中的類型 - Character role in subject */
    staff: string;
}

/**
 * 角色相關人物 - Character Related Person
 */
export interface CharacterPerson {
    /** 人物 ID - Person ID */
    id: number;
    /** 人物名稱 - Person name */
    name: string;
    /** 人物類型 - Person type */
    type: number;
    /** 人物圖片 - Person images */
    images: Images;
    /** 人物職業 - Person career */
    career: string[];
    /** 條目 ID - Subject ID */
    subject_id: number;
    /** 條目名稱 - Subject name */
    subject_name: string;
    /** 條目中文名稱 - Subject Chinese name */
    subject_name_cn: string;
}

/**
 * 角色收藏信息 - Character Collection Info
 */
export interface CharacterCollection {
    /** 角色 ID - Character ID */
    character_id: number;
    /** 角色 - Character */
    character: Character;
    /** 收藏時間 - Collected at */
    created_at: string;
    /** 評論 - Comment */
    comment?: string;
}

/**
 * 條目角色關聯 - Subject Character Relation
 */
export interface SubjectCharacterRelation {
    /** 角色 ID - Character ID */
    character_id: number;
    /** 條目 ID - Subject ID */
    subject_id: number;
    /** 角色在條目中的類型 - Character role type */
    type: CharacterRole;
    /** 排序順序 - Order */
    order: number;
}
