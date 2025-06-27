import type { CalendarItem, Subject, SearchResult, EpisodesResponse, Character, Person } from '@/types';
import bgmApi from './bgm-api';

// 獲取每日放送
export const GetCalendar = (): Promise<CalendarItem[]> => {
    return bgmApi.get<CalendarItem[]>('/calendar');
};

// 獲取條目信息
export const GetSubject = (id: number): Promise<Subject> => {
    return bgmApi.get<Subject>(`/v0/subjects/${id}`);
};

// 獲取條目角色列表
export const GetSubjectCharacters = (id: number): Promise<Character[]> => {
    return bgmApi.get<Character[]>(`/v0/subjects/${id}/characters`);
};

// 獲取條目製作人員
export const GetSubjectPersons = (id: number): Promise<Person[]> => {
    return bgmApi.get<Person[]>(`/v0/subjects/${id}/persons`);
};

// 獲取條目章節
export const GetSubjectEpisodes = (
    id: number,
    type?: number,
    limit?: number,
    offset?: number
): Promise<EpisodesResponse> => {
    const params = {
        type,
        limit,
        offset,
    };

    return bgmApi.get<EpisodesResponse>(`/v0/subjects/${id}/episodes`, { params });
};

// 搜索條目
export const SearchSubjects = (
    keyword: string,
    type?: number,
    responseGroup?: 'large' | 'medium' | 'small',
    start?: number,
    max_results?: number
): Promise<SearchResult> => {
    const params = {
        keyword,
        type,
        responseGroup,
        start,
        max_results,
    };

    return bgmApi.get<SearchResult>(`/search/subject/${encodeURIComponent(keyword)}`, { params });
};
