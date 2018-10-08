import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ArticleComponent } from './article/article.component';
import { ArticleOverviewComponent } from './article-overview/article-overview.component';
import { ArticleService } from './providers/article.service';
import { SharedModule } from '../shared/shared.module';
import { HotArticleComponent } from './hot-article/hot-article.component';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
    imports: [CommonModule, SharedModule, MarkdownModule.forRoot()],
    declarations: [ArticleComponent, ArticleOverviewComponent, HotArticleComponent],
    exports: [ArticleComponent, ArticleOverviewComponent, HotArticleComponent],
    providers: [ArticleService],
})
export class ArticleModule {}
