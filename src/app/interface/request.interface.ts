export class ArticleAddRequest {
    author: string;
    subtitle?: string;
    content: string;
    isPublished: boolean;
    category: string[];
}

export class ArticleUpdateRequest {
    id: number;
    content: string;
}

export class ArticleDeleteRequest {
    id: number;
}

export class ArticleSearchRequest {
    author: string;
    title: string;
    category: string[];
    offset: number;
    limit: number;
    isOverview: boolean;
}

export class ArticleStatisticsUpdateRequest {
    id: number;
    enjoy?: number;
    stored?: number;
}
