export interface CreateArticleRequest {
    author: string;
    subtitle?: string;
    content: string;
    isPublished: boolean;
    category: string[];
    isOriginal: boolean;
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
    rank: 'enjoy' | 'view' | 'stored';
}

export interface ArticleStatisticsUpdateRequest {
    id: number;
    enjoy?: number;
    stored?: number;
}

export interface GetQiniuTokenRequest {
    name: string;
}

export interface GetCommentRequest {
    id: string;
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

export interface DeleteCommentRequest {
    id: number;
    userId: number;
}

export interface ReplyRequest {
    fromUser: string;
    userId: number; // from user's user id;
    toUser: string;
    content: string;
    commentId: number;
}

export interface SeriesOverviewRequest {
    series: 'angular' | 'typescript' | 'rxjs' | 'javascript' | 'other';
}
