import { Character, Person, Subject } from '@/types';
import bgmApi from './bgm-api';

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
