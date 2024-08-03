type ApiItemType = 'job' | 'story' | 'comment' | 'poll' | 'pollopt';

export interface ApiItem {
    id: number;
    deleted?: boolean;
    type?: ApiItemType;
    by?: string;
    time?: number;
    text?: React.JSX.Element;
    dead?: boolean;
    parent?: number;
    poll?: number;
    kids?: number[];
    url?: string;
    score?: number;
    title?: React.JSX.Element;
    parts?: number[];
    descendants?: number;
}

export interface ApiUser {
    id: string;
    created: number;
    karma: number;
    about?: React.JSX.Element;
    submitted?: number[];
}