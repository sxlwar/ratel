import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EditorComponent } from '../../codemirror/editor/editor.component';
import { CommentService } from '../providers/comment.service';
import { ReplyBaseComponent } from '../base/reply.base.component';
import { ReplyRequest, CommentRequest } from 'src/app/interface/request.interface';

interface RouterParams {
    id: string;
    commentId: string;
    toUser: string;
    toUserId: string;
}

@Component({
    selector: 'ratel-reply-full',
    templateUrl: './reply-full.component.html',
    styleUrls: ['./reply-full.component.scss'],
})
export class ReplyFullComponent extends ReplyBaseComponent implements OnInit {
    showPreview = false;

    @ViewChild(EditorComponent)
    editor: EditorComponent;

    private params: RouterParams;

    isComment: boolean;

    constructor(private _route: ActivatedRoute, public commentService: CommentService) {
        super(commentService);
    }

    ngOnInit() {
        this.params = this._route.snapshot.params as RouterParams;

        this.isComment = !this.params.commentId; // 发表评论时没有 commentId
    }

    protected getReplyCommentParams(): ReplyRequest {
        const { commentId, toUser } = this.params;

        return {
            commentId: +commentId,
            toUser,
            fromUser: 'sxlwar',
            userId: 20088392,
            content: this.editor.data,
        };
    }

    protected getCreateCommentParams(): CommentRequest {
        const { id } = this.params;

        return {
            articleId: +id,
            content: this.editor.data,
            userId: 20088392,
            username: 'sxlwar',
        };
    }
}
