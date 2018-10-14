import { Observable } from 'rxjs';
import { CommentRequest, ReplyRequest } from 'src/app/interface/request.interface';

import { CommentService } from '../providers/comment.service';

export abstract class ReplyBaseComponent {
    abstract isComment: boolean;

    constructor(public commentService: CommentService) {}

    protected abstract getCreateCommentParams(): CommentRequest;
    protected abstract getReplyCommentParams(): ReplyRequest;

    submit(): void {
        const obs: Observable<any> = this.isComment
            ? this.commentService.createComment(this.getCreateCommentParams())
            : this.commentService.replyComment(this.getReplyCommentParams());
        const message = this.isComment ? '评论发表成功' : '';

        this.commentService.handleOperateCommentResult(obs, message, this.commentService.refreshComment);
    }
}
