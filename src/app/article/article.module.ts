import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ArticleComponent } from './article/article.component';
import { ArticleOverviewComponent } from './article-overview/article-overview.component';
import { ArticleService } from './providers/article.service';
import { SharedModule } from '../shared/shared.module';
import { HotArticleComponent } from './hot-article/hot-article.component';
import { MarkdownModule } from 'ngx-markdown';
import { CommentModule } from '../comment/comment.module';
import { ArticleCreationComponent } from './article-creation/article-creation.component';
import { CodemirrorModule } from '../codemirror/codemirror.module';
import { ArticleListComponent } from './article-list/article-list.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        MarkdownModule.forRoot(),
        CommentModule,
        CodemirrorModule,
    ],
    declarations: [ArticleComponent, ArticleOverviewComponent, HotArticleComponent, ArticleCreationComponent, ArticleListComponent],
    exports: [ArticleComponent, ArticleOverviewComponent, HotArticleComponent, ArticleCreationComponent, ArticleListComponent],
    providers: [ArticleService],
})
export class ArticleModule {}
