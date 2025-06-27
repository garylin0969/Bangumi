// ========== API 分類導出 - Categorized API Exports ==========
/**
 * 條目相關 API 集合 - Subject Related API Collection
 */
/**
 * 目錄相關 API 集合 - Catalog Related API Collection
 */
import * as CatalogAPI from './catalog';
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
 * 編輯歷史相關 API 集合 - Revision Related API Collection
 */
import * as RevisionAPI from './revision';
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

// ========== 編輯歷史相關 API - Revision Related API ==========
export * from './revision';

// ========== 目錄相關 API - Catalog Related API ==========
export * from './catalog';

// ========== API 集合導出 - API Collection Exports ==========
export { SubjectAPI };
export { CharacterAPI };
export { PersonAPI };
export { UserAPI };
export { CollectionAPI };
export { EpisodeAPI };
export { RevisionAPI };
export { CatalogAPI };

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
    Revision: RevisionAPI,
    Catalog: CatalogAPI,
};

/**
 * 常用 API 快捷方式 - Common API Shortcuts
 */
export const CommonAPI = {
    // 條目相關 - Subject Related
    getSubject: SubjectAPI.GetSubject,
    searchSubjects: SubjectAPI.SearchSubjects,
    getSubjects: SubjectAPI.GetSubjects,

    // 用戶相關 - User Related
    getUser: UserAPI.GetUser,
    getCurrentUser: UserAPI.GetCurrentUser,

    // 收藏相關 - Collection Related
    getUserCollections: CollectionAPI.GetUserCollections,
    getUserCollection: CollectionAPI.GetUserCollection,
    postUserCollection: CollectionAPI.PostUserCollection,

    // 章節相關 - Episode Related
    getEpisodes: EpisodeAPI.GetEpisodes,
    getEpisode: EpisodeAPI.GetEpisode,

    // 角色相關 - Character Related
    getCharacter: CharacterAPI.GetCharacter,
    searchCharacters: CharacterAPI.SearchCharacters,

    // 人物相關 - Person Related
    getPerson: PersonAPI.GetPerson,
    searchPersons: PersonAPI.SearchPersons,
};

// ========== 類型重新導出 - Type Re-exports ==========
export type * from '@/types';
