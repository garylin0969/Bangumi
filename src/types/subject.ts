// Subject 相關類型定義

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

export interface EpisodesResponse {
    total: number;
    limit: number;
    offset: number;
    data: Episode[];
}
