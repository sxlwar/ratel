import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../auth/interface/auth.interface';
import { AuthService } from '../../providers/auth.service';
import { EditorComponent } from '../../codemirror/editor/editor.component';
import { CommentRequest, ReplyRequest } from '../../interface/request.interface';
import { ReplyBaseComponent } from '../base/reply.base.component';
import { CommentService } from '../providers/comment.service';

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

    user: User;

    fileDropOver = false; // TODO drop to upload;

    constructor(
        private _route: ActivatedRoute,
        public commentService: CommentService,
        private _authService: AuthService,
    ) {
        super(commentService);
    }

    ngOnInit() {
        this.params = this._route.snapshot.params as RouterParams;

        this.isComment = !this.params.commentId; // 发表评论时没有 commentId

        this._authService.userObs.subscribe(user => (this.user = user));
    }

    protected getReplyCommentParams(): ReplyRequest {
        const { commentId, toUser } = this.params;
        const { name, account, id } = this.user;

        return {
            commentId: +commentId,
            toUser,
            fromUser: name || account,
            userId: id,
            content: this.editor.data,
        };
    }

    protected getCreateCommentParams(): CommentRequest {
        const { id } = this.params;
        const { name, account } = this.user;

        return {
            articleId: +id,
            content: this.editor.data,
            userId: this.user.id,
            username: name || account,
        };
    }
}
