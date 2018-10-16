import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MarkdownModule } from 'ngx-markdown';

import { AuthModule } from '../auth/auth.module';
import { CodemirrorModule } from '../codemirror/codemirror.module';
import { CommentModule } from '../comment/comment.module';
import { SharedModule } from '../shared/shared.module';
import { ArticleCreationComponent } from './article-creation/article-creation.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleOverviewComponent } from './article-overview/article-overview.component';
import { ArticleComponent } from './article/article.component';
import { HotArticleComponent } from './hot-article/hot-article.component';
import { ArticleService } from './providers/article.service';

@NgModule({
    imports: [CommonModule, SharedModule, MarkdownModule.forRoot(), CommentModule, CodemirrorModule, AuthModule],
    declarations: [
        ArticleComponent,
        ArticleOverviewComponent,
        HotArticleComponent,
        ArticleCreationComponent,
        ArticleListComponent,
    ],
    exports: [
        ArticleComponent,
        ArticleOverviewComponent,
        HotArticleComponent,
        ArticleCreationComponent,
        ArticleListComponent,
    ],
    providers: [ArticleService],
})
export class ArticleModule {}
