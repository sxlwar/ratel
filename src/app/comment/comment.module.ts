import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CommentComponent } from './comment/comment.component';
import { OperateCommentComponent } from './operate-comment/operate-comment.component';
import { CommentService } from './providers/comment.service';
import { ReplyComponent } from './reply/reply.component';
import { MarkdownModule } from 'ngx-markdown';
import { RouterModule } from '@angular/router';
import { CommentTotalComponent } from './comment-total/comment-total.component';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        MarkdownModule.forRoot(),
        RouterModule,
        FileUploadModule,
    ],
    declarations: [
        CommentComponent,
        ReplyComponent,
        OperateCommentComponent,
        CommentTotalComponent,
    ],
    exports: [
        CommentComponent,
        ReplyComponent,
        OperateCommentComponent,
        CommentTotalComponent,
    ],
    providers: [
        CommentService,
    ],

})
export class CommentModule { }
