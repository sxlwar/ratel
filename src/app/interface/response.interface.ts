export class ArticleOverview {
    id: number;
    author: string;
    title: string;
    createdAt: string;
    category: string[];
    statistics: ArticleStatistics;
    selected?: boolean; // 前端添加字段，用来实现某些效果；
}

export class Article extends ArticleOverview {
    updatedAt: string;
    subtitle: string;
    content: string;
    isPublished?: boolean;
    statistics: ArticleStatistics;
}

export class ArticleStatistics {
    id: number;
    enjoy: number; // star数
    view: number; // 被查看次数
    stored: number; // 被收藏次数
}
