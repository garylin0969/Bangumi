// User 相關類型定義

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
