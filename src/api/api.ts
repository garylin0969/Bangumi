import type {
    Subject,
    Character,
    Person,
    CalendarItem,
    SearchResult,
    User,
    UserCollectionsResponse,
    EpisodesResponse,
} from '@/types/bangumi';
import bgmApi from './bgm-api';

// 獲取角色信息
export const GetCharacter = (id: number): Promise<Character> => {
    return bgmApi.get<Character>(`/v0/characters/${id}`);
};

// 獲取角色相關條目
export const GetCharacterSubjects = (id: number): Promise<Subject[]> => {
    return bgmApi.get<Subject[]>(`/v0/characters/${id}/subjects`);
};

// 獲取人物信息
export const GetPerson = (id: number): Promise<Person> => {
    return bgmApi.get<Person>(`/v0/persons/${id}`);
};

// 獲取人物相關角色
export const GetPersonCharacters = (id: number): Promise<Character[]> => {
    return bgmApi.get<Character[]>(`/v0/persons/${id}/characters`);
};

// 獲取人物相關條目
export const GetPersonSubjects = (id: number): Promise<Subject[]> => {
    return bgmApi.get<Subject[]>(`/v0/persons/${id}/subjects`);
};

// 獲取每週新番時間表
export const GetCalendar = (): Promise<CalendarItem[]> => {
    return bgmApi.get<CalendarItem[]>('/calendar');
};

// 獲取用戶基本信息（公開部分）
export const GetUser = (username: string): Promise<User> => {
    return bgmApi.get<User>(`/v0/users/${username}`);
};

// 獲取用戶收藏（公開部分）
export const GetUserCollections = (
    username: string,
    subject_type?: number,
    type?: number,
    limit?: number,
    offset?: number
): Promise<UserCollectionsResponse> => {
    const params = {
        subject_type,
        type,
        limit,
        offset,
    };

    return bgmApi.get<UserCollectionsResponse>(`/v0/users/${username}/collections`, { params });
};
