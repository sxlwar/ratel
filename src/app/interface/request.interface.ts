export interface ArticleAddRequest {
    author: string;
    subtitle?: string;
    content: string;
    isPublished: boolean;
    category: string[];
}

export interface ArticleUpdateRequest {
    id: number;
    content: string;
}

export interface ArticleDeleteRequest {
    id: number;
}

export interface ArticleSearchRequest {
    author: string;
    title: string;
    category: string[];
    offset: number;
    limit: number;
    isOverview: boolean;
}

export interface ArticleStatisticsUpdateRequest {
    id: number;
    enjoy?: number;
    stored?: number;
}

export interface GetQiniuTokenRequest {
    name: string;
}

export interface GetQiniuTokenResponse {
    data: any;
}

export interface CommentRequest {
    username: string;
    content: string;
    articleId: number;
    userId: number;
}

export interface EnjoyCommentRequest {
    commentId: number;
    enjoy: number;
    userId: number;
}

export interface CommentDeleteRequest {
    id: number;
    userId: number;
}
