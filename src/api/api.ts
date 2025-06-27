import bgmApi from './bgm-api';
import type {
  Subject,
  Character,
  Person,
  Episode,
  CalendarItem,
  SearchResult,
  User,
  UserCollection,
  UserCollectionsResponse,
  EpisodesResponse,
  SUBJECT_TYPES,
  COLLECTION_TYPES,
  EPISODE_TYPES,
} from '../types/bangumi';

// API 函數
export const bangumiApi = {
  // 獲取條目信息
  getSubject: (id: number): Promise<Subject> =>
    bgmApi.get<Subject>(`/v0/subjects/${id}`),

  // 獲取條目角色列表
  getSubjectCharacters: (id: number): Promise<Character[]> =>
    bgmApi.get<Character[]>(`/v0/subjects/${id}/characters`),

  // 獲取條目製作人員
  getSubjectPersons: (id: number): Promise<Person[]> =>
    bgmApi.get<Person[]>(`/v0/subjects/${id}/persons`),

  // 獲取條目章節
  getSubjectEpisodes: (id: number, type?: number, limit?: number, offset?: number): Promise<EpisodesResponse> => {
    const params = new URLSearchParams();
    if (type !== undefined) params.append('type', type.toString());
    if (limit !== undefined) params.append('limit', limit.toString());
    if (offset !== undefined) params.append('offset', offset.toString());

    return bgmApi.get<EpisodesResponse>(`/v0/subjects/${id}/episodes?${params.toString()}`);
  },

  // 獲取角色信息
  getCharacter: (id: number): Promise<Character> =>
    bgmApi.get<Character>(`/v0/characters/${id}`),

  // 獲取角色相關條目
  getCharacterSubjects: (id: number): Promise<Subject[]> =>
    bgmApi.get<Subject[]>(`/v0/characters/${id}/subjects`),

  // 獲取人物信息
  getPerson: (id: number): Promise<Person> =>
    bgmApi.get<Person>(`/v0/persons/${id}`),

  // 獲取人物相關角色
  getPersonCharacters: (id: number): Promise<Character[]> =>
    bgmApi.get<Character[]>(`/v0/persons/${id}/characters`),

  // 獲取人物相關條目
  getPersonSubjects: (id: number): Promise<Subject[]> =>
    bgmApi.get<Subject[]>(`/v0/persons/${id}/subjects`),

  // 獲取每週新番時間表
  getCalendar: (): Promise<CalendarItem[]> =>
    bgmApi.get<CalendarItem[]>('/calendar'),

  // 搜索條目
  searchSubjects: (keyword: string, type?: number, responseGroup?: 'large' | 'medium' | 'small', start?: number, max_results?: number): Promise<SearchResult> => {
    const params = new URLSearchParams();
    params.append('keyword', keyword);
    if (type !== undefined) params.append('type', type.toString());
    if (responseGroup) params.append('responseGroup', responseGroup);
    if (start !== undefined) params.append('start', start.toString());
    if (max_results !== undefined) params.append('max_results', max_results.toString());

    return bgmApi.get<SearchResult>(`/search/subject/${encodeURIComponent(keyword)}?${params.toString()}`);
  },

  // 獲取用戶基本信息（公開部分）
  getUser: (username: string): Promise<User> =>
    bgmApi.get<User>(`/v0/users/${username}`),

  // 獲取用戶收藏（公開部分）
  getUserCollections: (username: string, subject_type?: number, type?: number, limit?: number, offset?: number): Promise<UserCollectionsResponse> => {
    const params = new URLSearchParams();
    if (subject_type !== undefined) params.append('subject_type', subject_type.toString());
    if (type !== undefined) params.append('type', type.toString());
    if (limit !== undefined) params.append('limit', limit.toString());
    if (offset !== undefined) params.append('offset', offset.toString());

    return bgmApi.get<UserCollectionsResponse>(`/v0/users/${username}/collections?${params.toString()}`);
  },
};

// 重新導出常量以保持 API 一致性
export { SUBJECT_TYPES, COLLECTION_TYPES, EPISODE_TYPES };