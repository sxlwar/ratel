import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CommentComponent } from './comment/comment.component';
import { OperateCommentComponent } from './operate-comment/operate-comment.component';
import { ReplyComponent } from './reply/reply.component';
import { MarkdownModule } from 'ngx-markdown';
import { RouterModule } from '@angular/router';
import { CommentTotalComponent } from './comment-total/comment-total.component';
import { ReplyFullComponent } from './reply-full/reply-full.component';
import { CodemirrorModule } from '../codemirror/codemirror.module';
import { AuthModule } from '../auth/auth.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        MarkdownModule.forChild(),
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
})
export class CommentModule {}
