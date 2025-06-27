// Bangumi API 類型定義

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

export interface User {
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
}

export interface UserCollection {
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
}

export interface UserCollectionsResponse {
  total: number;
  limit: number;
  offset: number;
  data: UserCollection[];
}

export interface EpisodesResponse {
  total: number;
  limit: number;
  offset: number;
  data: Episode[];
}

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