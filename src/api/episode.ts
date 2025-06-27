// 章節相關 API - Episode Related API
import { EpisodeDetail, Paged_Episode } from '@/types';
import bgmApi from './bgm-api';

// ========== 章節基本操作 - Basic Episode Operations ==========

/**
 * 獲取章節 - Get Episodes
 * @param subject_id 條目 ID - Subject ID
 * @param type 章節類型 - Episode type (可選)
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<Paged_Episode> 章節列表響應
 */
export const GetEpisodes = (params: {
    subject_id: number;
    type?: number;
    limit?: number;
    offset?: number;
}): Promise<Paged_Episode> => {
    return bgmApi.get<Paged_Episode>('/v0/episodes', { params });
};

/**
 * 獲取章節詳情 - Get Episode Detail
 * @param episode_id 章節 ID - Episode ID
 * @returns Promise<EpisodeDetail> 章節詳細信息
 */
export const GetEpisode = (episode_id: number): Promise<EpisodeDetail> => {
    return bgmApi.get<EpisodeDetail>(`/v0/episodes/${episode_id}`);
};
