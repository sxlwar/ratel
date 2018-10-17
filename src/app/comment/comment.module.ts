import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CommentComponent } from './comment/comment.component';
import { OperateCommentComponent } from './operate-comment/operate-comment.component';
import { CommentService } from './providers/comment.service';
import { ReplyComponent } from './reply/reply.component';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { RouterModule } from '@angular/router';
import { CommentTotalComponent } from './comment-total/comment-total.component';
import { ReplyFullComponent } from './reply-full/reply-full.component';
import { CodemirrorModule } from '../codemirror/codemirror.module';
import { AuthModule } from '../auth/auth.module';

export function markedOptionsFactory(): MarkedOptions {
    const renderer = new MarkedRenderer();

    renderer.blockquote = (text: string) => {
        return '<blockquote class="blockquote"><p>' + text + '</p></blockquote>';
    };

    return {
        renderer: renderer,
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
    };
}

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        MarkdownModule.forRoot({
            markedOptions: {
                provide: MarkedOptions,
                useFactory: markedOptionsFactory,
            },
        }),
        RouterModule,
        CodemirrorModule,
        AuthModule,
    ],
    declarations: [
        CommentComponent,
        ReplyComponent,
        OperateCommentComponent,
        CommentTotalComponent,
        ReplyFullComponent,
    ],
    exports: [CommentComponent, ReplyComponent, OperateCommentComponent, CommentTotalComponent, ReplyFullComponent],
    providers: [CommentService],
})
export class CommentModule {}
