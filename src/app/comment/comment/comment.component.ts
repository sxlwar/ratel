import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { omit } from 'lodash';
import { CommentElement, GetCommentResponse, Reply } from 'src/app/interface/response.interface';
import { CommentService } from '../providers/comment.service';
import { Observable } from 'rxjs';
import { map, takeWhile, startWith } from 'rxjs/operators';

interface CommentTarget {
    commentId: number;
    toUser: string;
    toUserId?: number;
}

@Component({
    selector: 'ratel-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit, OnDestroy {
    @Output()
    reply: EventEmitter<any> = new EventEmitter();

    @Output()
    delete: EventEmitter<any> = new EventEmitter();

    @Output()
    update: EventEmitter<any> = new EventEmitter();

    commentList: Observable<CommentElement[]>;

    commentTotal: Observable<number>;

    /**
     * current user
     */
    username: string;

    /**
     * @ignore
     */
    isAlive = true;

    target: CommentTarget;

    constructor(private _router: Router, private _route: ActivatedRoute, private _commentService: CommentService) {}

    ngOnInit() {
        this._commentService.refresh$
            .pipe(
                takeWhile(() => this.isAlive),
                startWith(true),
            )
            .subscribe(_ => this.initialModel());
        // TODO 获取当前用户的名称；username;
    }

    private initialModel() {
        const comment = this._commentService.getComments({ id: this._route.snapshot.paramMap.get('id') });

        this.commentList = comment.pipe(map(response => response.comments));

        this.commentTotal = comment.pipe(map(response => response.count));
    }

    onDelete() {}

    /**
     * 是否可以回复此评论，只有不是本人的评论内容时才可回复
     */
    canReply(comment: CommentElement & Reply) {
        const name = comment.username || comment.fromUser;

        return this.username !== name;
    }

    /**
     * 设置评论目标
     * 1、回复评论: targetId === comment.id toUser === comment.username toUserId === comment.userId
     * 2、回复回复: targetId === comment.id toUser === reply.fromUser
     */
    setTarget(commentId: number, toUser: string, toUserId?: number): void {
        this.target = { commentId, toUser, toUserId };
    }

    enjoyComment(commentId: number): void {
        this._commentService.handleOperateCommentResult(
            this._commentService.enjoyComment({ commentId, userId: 1, enjoy: 1 }),
            '',
        );
    }

    switchToImageTextModel(): void {
        this._router.navigate(['reply', { ...this.target }], { relativeTo: this._route });
    }

    ngOnDestroy() {
        this.isAlive = false;
    }
}
