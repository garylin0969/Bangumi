// Character 相關類型定義

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
