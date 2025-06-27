// 角色相關類型定義 - Character Related Type Definitions
import { CharacterType, SubjectType } from './common';

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
 * 角色基本信息 - Basic Character Information (對應 API schema Character)
 */
export interface Character {
    /** 角色 ID - Character ID */
    id: number;
    /** 角色名稱 - Character name */
    name: string;
    /** 角色類型 - Character type */
    type: CharacterType;
    /** 角色簡介 - Character summary */
    summary: string;
    /** 是否被鎖定 - Is locked */
    locked: boolean;
    /** 統計信息 - Statistics */
    stat: Stat;
    /** 角色圖片 - Character images */
    images?: PersonImages;
    /** 信息框原始內容 - Raw infobox content */
    infobox?: InfoboxItem[];
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
}

/**
 * 血型枚舉 - Blood Type (對應 API schema BloodType)
 */
export enum BloodType {
    /** A型 - Type A */
    A = 1,
    /** B型 - Type B */
    B = 2,
    /** AB型 - Type AB */
    AB = 3,
    /** O型 - Type O */
    O = 4,
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
 * 角色相關人物 - Character Related Person (對應 API schema CharacterPerson)
 */
export interface CharacterPerson {
    /** 人物 ID - Person ID */
    id: number;
    /** 人物名稱 - Person name */
    name: string;
    /** 人物類型 - Person type */
    type: CharacterType;
    /** 條目 ID - Subject ID */
    subject_id: number;
    /** 條目類型 - Subject type */
    subject_type: SubjectType;
    /** 條目名稱 - Subject name */
    subject_name: string;
    /** 條目中文名稱 - Subject Chinese name */
    subject_name_cn: string;
    /** 人物圖片 - Person images */
    images?: PersonImages;
    /** 人物職位 - Person staff */
    staff?: string;
}

/**
 * v0版本相關條目 - v0 Related Subject (對應 API schema v0_RelatedSubject)
 */
export interface v0_RelatedSubject {
    /** 條目 ID - Subject ID */
    id: number;
    /** 條目類型 - Subject type */
    type: SubjectType;
    /** 人物職位 - Staff position */
    staff: string;
    /** 條目名稱 - Subject name */
    name: string;
    /** 條目中文名稱 - Subject Chinese name */
    name_cn: string;
    /** 條目圖片 - Subject image */
    image?: string;
}

/**
 * 分頁角色響應 - Paged Character Response (對應 API schema Paged_Character)
 */
export interface Paged_Character {
    /** 總數 - Total count */
    total: number;
    /** 每頁限制 - Items per page limit */
    limit: number;
    /** 偏移量 - Offset */
    offset: number;
    /** 角色數據 - Character data */
    data: Character[];
}

// ========== 廢棄的類型定義 (保持向後兼容) - Deprecated Types ==========

/**
 * @deprecated 使用 Character 替代
 */
export interface CharacterDetail extends Character {
    /** 相關條目 - Related subjects */
    subjects?: CharacterSubject[];
    /** 相關人物 (聲優等) - Related persons (voice actors, etc.) */
    persons?: CharacterPerson[];
}

/**
 * @deprecated 使用 InfoboxItem 替代
 */
export interface CharacterInfoboxItem {
    /** 項目鍵 - Item key */
    key: string;
    /** 項目值 - Item value */
    value: string | CharacterInfoboxValue[];
}

/**
 * @deprecated 使用 InfoboxValue 替代
 */
export interface CharacterInfoboxValue {
    /** 值內容 - Value content */
    v: string;
    /** 值鏈接 - Value link */
    k?: string;
}

/**
 * @deprecated 使用 Stat 替代
 */
export interface CharacterStats {
    /** 評論數 - Comments count */
    comments: number;
    /** 收藏數 - Collections count */
    collects: number;
}

/**
 * @deprecated 使用 v0_RelatedSubject 替代
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

// ========== 其他輔助類型 - Helper Types ==========

/**
 * 角色收藏 - Character Collection
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
    type: number;
    /** 排序順序 - Order */
    order: number;
}
