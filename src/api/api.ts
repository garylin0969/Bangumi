import bgmApi from './bgm-api';

// 類型定義
export interface Subject {
  id: number;
  type: number;
  name: string;
  name_cn: string;
  summary: string;
  air_date: string;
  air_weekday: number;
  images: {
    large: string;
    common: string;
    medium: string;
    small: string;
    grid: string;
  };
  collection: {
    wish: number;
    collect: number;
    doing: number;
    on_hold: number;
    dropped: number;
  };
  rating: {
    total: number;
    count: {
      1: number;
      2: number;
      3: number;
      4: number;
      5: number;
      6: number;
      7: number;
      8: number;
      9: number;
      10: number;
    };
    score: number;
  };
  tags: Array<{
    name: string;
    count: number;
  }>;
}

export interface Character {
  id: number;
  name: string;
  type: number;
  images: {
    large: string;
    medium: string;
    small: string;
    grid: string;
  };
  summary: string;
  locked: boolean;
}

export interface Person {
  id: number;
  name: string;
  type: number;
  career: string[];
  images: {
    large: string;
    medium: string;
    small: string;
    grid: string;
  };
  summary: string;
  locked: boolean;
}

export interface Episode {
  id: number;
  type: number;
  name: string;
  name_cn: string;
  sort: number;
  ep: number;
  airdate: string;
  comment: number;
  duration: string;
  desc: string;
}

export interface CalendarItem {
  weekday: {
    en: string;
    cn: string;
    ja: string;
    id: number;
  };
  items: Subject[];
}

export interface SearchResult {
  results: number;
  list: Subject[];
}

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
  getSubjectEpisodes: (id: number, type?: number, limit?: number, offset?: number): Promise<{
    total: number;
    limit: number;
    offset: number;
    data: Episode[];
  }> => {
    const params = new URLSearchParams();
    if (type !== undefined) params.append('type', type.toString());
    if (limit !== undefined) params.append('limit', limit.toString());
    if (offset !== undefined) params.append('offset', offset.toString());

    return bgmApi.get<{
      total: number;
      limit: number;
      offset: number;
      data: Episode[];
    }>(`/v0/subjects/${id}/episodes?${params.toString()}`);
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
  getUser: (username: string): Promise<{
    id: number;
    username: string;
    nickname: string;
    avatar: {
      large: string;
      medium: string;
      small: string;
    };
    sign: string;
    joindate: string;
  }> =>
    bgmApi.get<{
      id: number;
      username: string;
      nickname: string;
      avatar: {
        large: string;
        medium: string;
        small: string;
      };
      sign: string;
      joindate: string;
    }>(`/v0/users/${username}`),

  // 獲取用戶收藏（公開部分）
  getUserCollections: (username: string, subject_type?: number, type?: number, limit?: number, offset?: number): Promise<{
    total: number;
    limit: number;
    offset: number;
    data: Array<{
      subject_id: number;
      subject_type: number;
      type: number;
      name: string;
      name_cn: string;
      images: {
        large: string;
        common: string;
        medium: string;
        small: string;
        grid: string;
      };
      comment: string;
      tags: string[];
      rating: number;
      private: boolean;
    }>;
  }> => {
    const params = new URLSearchParams();
    if (subject_type !== undefined) params.append('subject_type', subject_type.toString());
    if (type !== undefined) params.append('type', type.toString());
    if (limit !== undefined) params.append('limit', limit.toString());
    if (offset !== undefined) params.append('offset', offset.toString());

    return bgmApi.get<{
      total: number;
      limit: number;
      offset: number;
      data: Array<{
        subject_id: number;
        subject_type: number;
        type: number;
        name: string;
        name_cn: string;
        images: {
          large: string;
          common: string;
          medium: string;
          small: string;
          grid: string;
        };
        comment: string;
        tags: string[];
        rating: number;
        private: boolean;
      }>;
    }>(`/v0/users/${username}/collections?${params.toString()}`);
  },
};

// 條目類型常量
export const SUBJECT_TYPES = {
  BOOK: 1,
  ANIME: 2,
  MUSIC: 3,
  GAME: 4,
  REAL: 6,
} as const;

// 收藏狀態常量
export const COLLECTION_TYPES = {
  WISH: 1,
  COLLECT: 2,
  DOING: 3,
  ON_HOLD: 4,
  DROPPED: 5,
} as const;

// 章節類型常量
export const EPISODE_TYPES = {
  MAIN: 0,
  SPECIAL: 1,
  OP: 2,
  ED: 3,
  TRAILER: 4,
  MAD: 5,
  OTHER: 6,
} as const;