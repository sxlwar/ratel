export interface ArticleCreateForm {
    author: string;
    title: string;
    subtitle?: string;
    category: string[];
    isOriginal: boolean;
}
