// 章節相關 API - Episode Related API
import {
    Episode,
    EpisodeDetail,
    EpisodesResponse,
    EpisodeComment,
    EpisodeProgress,
    EpisodeSearchResult,
    EpisodeWatchStatus,
} from '@/types';
import bgmApi from './bgm-api';

// ========== 章節基本操作 - Basic Episode Operations ==========

/**
 * 獲取章節信息 - Get Episode Information
 * @param id 章節 ID - Episode ID
 * @returns Promise<Episode> 章節信息
 */
export const GetEpisode = (id: number): Promise<Episode> => {
    return bgmApi.get<Episode>(`/v0/episodes/${id}`);
};

/**
 * 獲取章節詳細信息 - Get Episode Detailed Information
 * @param id 章節 ID - Episode ID
 * @returns Promise<EpisodeDetail> 章節詳細信息
 */
export const GetEpisodeDetail = (id: number): Promise<EpisodeDetail> => {
    return bgmApi.get<EpisodeDetail>(`/v0/episodes/${id}?responseGroup=large`);
};

/**
 * 獲取多個章節信息 - Get Multiple Episodes Information
 * @param ids 章節 ID 列表 - Episode ID list
 * @returns Promise<Episode[]> 章節信息列表
 */
export const GetEpisodes = (ids: number[]): Promise<Episode[]> => {
    const idsParam = ids.join(',');
    return bgmApi.get<Episode[]>(`/v0/episodes?ids=${idsParam}`);
};

/**
 * 獲取條目的所有章節 - Get All Episodes of Subject
 * @param subject_id 條目 ID - Subject ID
 * @param type 章節類型 - Episode type (可選)
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<EpisodesResponse> 章節列表響應
 */
export const GetAllEpisodesOfSubject = (
    subject_id: number,
    type?: number,
    limit?: number,
    offset?: number
): Promise<EpisodesResponse> => {
    const params = { type, limit, offset };
    return bgmApi.get<EpisodesResponse>(`/v0/subjects/${subject_id}/episodes`, { params });
};

// ========== 章節搜索 - Episode Search ==========

/**
 * 搜索章節 - Search Episodes
 * @param keyword 搜索關鍵字 - Search keyword
 * @param subject_id 條目 ID - Subject ID (可選)
 * @param type 章節類型 - Episode type (可選)
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<EpisodeSearchResult> 搜索結果
 */
export const SearchEpisodes = (
    keyword: string,
    subject_id?: number,
    type?: number,
    limit?: number,
    offset?: number
): Promise<EpisodeSearchResult> => {
    const params = { keyword, subject_id, type, limit, offset };
    return bgmApi.get<EpisodeSearchResult>(`/v0/search/episodes`, { params });
};

// ========== 章節進度管理 - Episode Progress Management ==========

/**
 * 獲取章節觀看進度 - Get Episode Watch Progress
 * @param subject_id 條目 ID - Subject ID
 * @param episode_id 章節 ID - Episode ID (可選，不提供則獲取所有章節進度)
 * @returns Promise<EpisodeProgress | EpisodeProgress[]> 章節進度
 */
export const GetEpisodeProgress = (
    subject_id: number,
    episode_id?: number
): Promise<EpisodeProgress | EpisodeProgress[]> => {
    const url = episode_id
        ? `/v0/me/collections/${subject_id}/episodes/${episode_id}`
        : `/v0/me/collections/${subject_id}/episodes`;
    return bgmApi.get<EpisodeProgress | EpisodeProgress[]>(url);
};

/**
 * 更新章節觀看狀態 - Update Episode Watch Status
 * @param subject_id 條目 ID - Subject ID
 * @param episode_id 章節 ID - Episode ID
 * @param status 觀看狀態 - Watch status
 * @returns Promise<EpisodeProgress> 更新後的章節進度
 */
export const UpdateEpisodeStatus = (
    subject_id: number,
    episode_id: number,
    status: EpisodeWatchStatus
): Promise<EpisodeProgress> => {
    const data = { status };
    return bgmApi.put<EpisodeProgress>(`/v0/me/collections/${subject_id}/episodes/${episode_id}`, data);
};

/**
 * 批量更新章節觀看狀態 - Batch Update Episode Watch Status
 * @param subject_id 條目 ID - Subject ID
 * @param episodes 章節狀態更新列表 - Episode status update list
 * @returns Promise<EpisodeProgress[]> 更新後的章節進度列表
 */
export const BatchUpdateEpisodeStatus = (
    subject_id: number,
    episodes: { episode_id: number; status: EpisodeWatchStatus }[]
): Promise<EpisodeProgress[]> => {
    const data = { episodes };
    return bgmApi.patch<EpisodeProgress[]>(`/v0/me/collections/${subject_id}/episodes`, data);
};

/**
 * 標記章節為已觀看 - Mark Episode as Watched
 * @param subject_id 條目 ID - Subject ID
 * @param episode_id 章節 ID - Episode ID
 * @returns Promise<EpisodeProgress> 更新後的章節進度
 */
export const MarkEpisodeAsWatched = (subject_id: number, episode_id: number): Promise<EpisodeProgress> => {
    return UpdateEpisodeStatus(subject_id, episode_id, EpisodeWatchStatus.Watched);
};

/**
 * 標記所有章節為已觀看 - Mark All Episodes as Watched
 * @param subject_id 條目 ID - Subject ID
 * @param episode_type 章節類型 - Episode type (可選，默認只標記正篇)
 * @returns Promise<EpisodeProgress[]> 更新後的章節進度列表
 */
export const MarkAllEpisodesAsWatched = (subject_id: number, episode_type: number = 0): Promise<EpisodeProgress[]> => {
    const data = { episode_type, status: EpisodeWatchStatus.Watched };
    return bgmApi.post<EpisodeProgress[]>(`/v0/me/collections/${subject_id}/episodes/watch-all`, data);
};

// ========== 章節評論 - Episode Comments ==========

/**
 * 獲取章節評論 - Get Episode Comments
 * @param episode_id 章節 ID - Episode ID
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<EpisodeComment[]> 章節評論列表
 */
export const GetEpisodeComments = (episode_id: number, limit?: number, offset?: number): Promise<EpisodeComment[]> => {
    const params = { limit, offset };
    return bgmApi.get<EpisodeComment[]>(`/v0/episodes/${episode_id}/comments`, { params });
};

/**
 * 添加章節評論 - Add Episode Comment
 * @param episode_id 章節 ID - Episode ID
 * @param content 評論內容 - Comment content
 * @param rating 評分 - Rating (可選)
 * @returns Promise<EpisodeComment> 新添加的評論
 */
export const AddEpisodeComment = (episode_id: number, content: string, rating?: number): Promise<EpisodeComment> => {
    const data = { content, rating };
    return bgmApi.post<EpisodeComment>(`/v0/episodes/${episode_id}/comments`, data);
};

/**
 * 更新章節評論 - Update Episode Comment
 * @param episode_id 章節 ID - Episode ID
 * @param comment_id 評論 ID - Comment ID
 * @param content 評論內容 - Comment content
 * @param rating 評分 - Rating (可選)
 * @returns Promise<EpisodeComment> 更新後的評論
 */
export const UpdateEpisodeComment = (
    episode_id: number,
    comment_id: number,
    content: string,
    rating?: number
): Promise<EpisodeComment> => {
    const data = { content, rating };
    return bgmApi.put<EpisodeComment>(`/v0/episodes/${episode_id}/comments/${comment_id}`, data);
};

/**
 * 刪除章節評論 - Delete Episode Comment
 * @param episode_id 章節 ID - Episode ID
 * @param comment_id 評論 ID - Comment ID
 * @returns Promise<void>
 */
export const DeleteEpisodeComment = (episode_id: number, comment_id: number): Promise<void> => {
    return bgmApi.delete<void>(`/v0/episodes/${episode_id}/comments/${comment_id}`);
};

// ========== 章節統計 - Episode Statistics ==========

/**
 * 獲取最新更新的章節 - Get Latest Updated Episodes
 * @param limit 每頁數量 - Items per page (可選)
 * @param offset 偏移量 - Offset (可選)
 * @returns Promise<Episode[]> 最新章節列表
 */
export const GetLatestEpisodes = (limit?: number, offset?: number): Promise<Episode[]> => {
    const params = { limit, offset };
    return bgmApi.get<Episode[]>(`/v0/episodes/latest`, { params });
};

/**
 * 獲取今日播出的章節 - Get Today's Episodes
 * @returns Promise<Episode[]> 今日播出章節列表
 */
export const GetTodayEpisodes = (): Promise<Episode[]> => {
    return bgmApi.get<Episode[]>(`/v0/episodes/today`);
};
