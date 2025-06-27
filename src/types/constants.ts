// 常量定義

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
