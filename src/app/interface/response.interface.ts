export interface CreateArticleResponse {
    id: number;
}

export interface ArticleOverview {
    id: number;
    author: string;
    title: string;
    createdAt: string;
    category: string[];
    statistics: ArticleStatistics;
    summary: string;
    selected?: boolean; // 前端添加字段，用来实现某些效果；
}

export interface Article extends ArticleOverview {
    updatedAt: string;
    subtitle: string;
    content: string;
    isPublished?: boolean;
    isOriginal: boolean;
    statistics: ArticleStatistics;
}

export interface ArticleStatistics {
    id: number;
    enjoy: number; // star数
    view: number; // 被查看次数
    stored: number; // 被收藏次数
}

export interface GetCommentResponse {
    comments: CommentElement[];
    count: number;
}

export interface CommentElement {
    articleId: number;
    content: string;
    createdAt: string;
    enjoy: number;
    id: number;
    isDeleted: boolean;
    replies: Reply[];
    userId: number;
    username: string;
    openReply?: boolean; // frontend custom field;
}

export interface Reply {
    content: string;
    createdAt: string;
    fromUser: string;
    id: number;
    toUser: string;
    userId: number;
}

export interface AddCommentResponse {
    id: number;
    createdAt: string;
}

export interface DeleteCommentResponse {
    isDeleted: boolean;
}

export interface UpdateCommentResponse {
    updated: true;
}

export interface EnjoyCommentResponse {
    updated: true;
}

export interface GetQiniuTokenResponse {
    uploadToken: string;
}

export interface SeriesOverviewResponse {
    total: number;
    original: number;
}

export interface LogoutResponse {
    isLogout: boolean;
}

export interface StoreResponse {
    isSuccess: boolean;
}

export interface Bookmark {
    id: number;
    author: string;
    title: string;
    createdAt: string;
}

export interface BookmarkResponse {
    articles: Bookmark[];
    count: number;
}
