// ========== API 分類導出 - Categorized API Exports ==========
/**
 * 條目相關 API 集合 - Subject Related API Collection
 */
/**
 * 角色相關 API 集合 - Character Related API Collection
 */
import * as CharacterAPI from './character';
/**
 * 收藏相關 API 集合 - Collection Related API Collection
 */
import * as CollectionAPI from './collection';
/**
 * 章節相關 API 集合 - Episode Related API Collection
 */
import * as EpisodeAPI from './episode';
/**
 * 人物相關 API 集合 - Person Related API Collection
 */
import * as PersonAPI from './person';
/**
 * 搜索相關 API 集合 - Search Related API Collection
 */
import * as SearchAPI from './search';
import * as SubjectAPI from './subject';
/**
 * 用戶相關 API 集合 - User Related API Collection
 */
import * as UserAPI from './user';

// API 統一導出文件 - Unified API Export File

// ========== 基礎配置 - Base Configuration ==========
export {
    default as bgmApi,
    setAuthToken,
    clearAuthToken,
    getAuthToken,
    isAuthenticated,
    setBaseURL,
    setTimeout,
} from './bgm-api';

// ========== 條目相關 API - Subject Related API ==========
export * from './subject';

// ========== 角色相關 API - Character Related API ==========
export * from './character';

// ========== 人物相關 API - Person Related API ==========
export * from './person';

// ========== 用戶相關 API - User Related API ==========
export * from './user';

// ========== 收藏相關 API - Collection Related API ==========
export * from './collection';

// ========== 章節相關 API - Episode Related API ==========
export * from './episode';

// ========== 搜索相關 API - Search Related API ==========
export * from './search';

export { SubjectAPI };

export { CharacterAPI };

export { PersonAPI };

export { UserAPI };

export { CollectionAPI };

export { EpisodeAPI };

export { SearchAPI };

// ========== 便捷 API 組合 - Convenient API Combinations ==========

/**
 * 所有 API 的統一集合 - Unified Collection of All APIs
 */
export const BangumiAPI = {
    Subject: SubjectAPI,
    Character: CharacterAPI,
    Person: PersonAPI,
    User: UserAPI,
    Collection: CollectionAPI,
    Episode: EpisodeAPI,
    Search: SearchAPI,
};

/**
 * 常用 API 快捷方式 - Common API Shortcuts
 */
export const CommonAPI = {
    // 條目相關 - Subject Related
    getSubject: SubjectAPI.GetSubject,
    searchSubjects: SubjectAPI.SearchSubjects,
    getCalendar: SubjectAPI.GetCalendar,

    // 用戶相關 - User Related
    getUser: UserAPI.GetUser,
    getCurrentUser: UserAPI.GetCurrentUser,
    getUserCollections: UserAPI.GetUserCollections,

    // 搜索相關 - Search Related
    globalSearch: SearchAPI.GlobalSearch,
    quickSearch: SearchAPI.QuickSearch,

    // 收藏相關 - Collection Related
    getSubjectCollectionStatus: CollectionAPI.GetSubjectCollectionStatus,
    updateSubjectCollection: CollectionAPI.UpdateSubjectCollection,

    // 章節相關 - Episode Related
    getAllEpisodesOfSubject: EpisodeAPI.GetAllEpisodesOfSubject,
    updateEpisodeStatus: EpisodeAPI.UpdateEpisodeStatus,
};

// ========== 類型重新導出 - Type Re-exports ==========
export type * from '@/types';
