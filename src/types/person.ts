// Person 相關類型定義

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
