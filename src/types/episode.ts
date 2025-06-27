// 章節相關類型定義 - Episode Related Type Definitions
import { EpisodeType } from './common';

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
    ep?: number;
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
    /** 條目 ID - Subject ID */
    subject_id?: number;
}

/**
 * 章節詳細信息 - Episode Detail Information
 */
export interface EpisodeDetail {
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
    ep?: number;
    /** 播出日期 - Air date */
    airdate: string;
    /** 評論數 - Comment count */
    comment: number;
    /** 時長 - Duration */
    duration: string;
    /** 章節描述 - Episode description */
    desc: string;
    /** 光盤編號 - Disc number */
    disc: number;
    /** 條目 ID - Subject ID */
    subject_id: number;
}

/**
 * 分頁章節響應 - Paged Episode Response
 */
export interface Paged_Episode {
    /** 總數 - Total count */
    total: number;
    /** 每頁限制 - Items per page limit */
    limit: number;
    /** 偏移量 - Offset */
    offset: number;
    /** 章節數據 - Episode data */
    data: Episode[];
}
