import { Character, Subject } from '@/types';
import bgmApi from './bgm-api';

// 獲取角色信息
export const GetCharacter = (id: number): Promise<Character> => {
    return bgmApi.get<Character>(`/v0/characters/${id}`);
};

// 獲取角色相關條目
export const GetCharacterSubjects = (id: number): Promise<Subject[]> => {
    return bgmApi.get<Subject[]>(`/v0/characters/${id}/subjects`);
};
