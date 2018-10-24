import { Component, OnDestroy, OnInit, Input, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import { combineLatest, merge, Observable, Subject } from 'rxjs';
import { bufferTime, filter, map, pluck, startWith, takeWhile, share } from 'rxjs/operators';

import { User } from '../../auth/interface/auth.interface';
import { CommentElement, Reply } from '../../interface/response.interface';
import { CommentTarget, EnjoyUpdateInfo } from '../interface/comment.interface';
import { CommentService } from '../providers/comment.service';

@Component({
    selector: 'ratel-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit, OnDestroy {
    commentList: Observable<CommentElement[]>;

    commentTotal: Observable<number>;

    @Input()
    user: User;

    isAlive = true;

    target: CommentTarget;

    private removed$: Subject<number> = new Subject();

    enjoy$: Subject<number> = new Subject();

    private updateEnjoy$: Subject<EnjoyUpdateInfo> = new Subject();

    private isBrowser = isPlatformBrowser(this._platformId);

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _commentService: CommentService,
        @Inject(PLATFORM_ID) private _platformId: Object,
    ) {}

    ngOnInit() {
        const refreshWhenRouterParamChanged = this._router.events.pipe(filter(event => event instanceof NavigationEnd));
        const refreshWhenServiceNotified = this._commentService.refresh$.pipe(startWith(true));

        merge(refreshWhenRouterParamChanged, refreshWhenServiceNotified)
            .pipe(takeWhile(() => this.isAlive))
            .subscribe(_ => this.initialModel());

        this.launch();
    }

    private launch(): void {
        this.enjoy$
            .asObservable()
            .pipe(
                bufferTime(1000),
                filter(ary => ary.length > 0),
            )
            .subscribe(value => this.enjoyComment(value[0], value.length));
    }

    private initialModel() {
        const comment = combineLatest(
            this._commentService.getComments({ id: this._route.snapshot.paramMap.get('id') }),
            this.removed$.pipe(startWith(null)),
            this.updateEnjoy$.pipe(startWith(null)),
        ).pipe(
            map(([result, id, enjoyInfo]) => {
                const { comments, count } = result;
                const data = !!id ? { comments: comments.filter(item => item.id !== id), count: count - 1 } : result;

                if (!!enjoyInfo) {
                    const { commentId, addCount } = enjoyInfo;
                    const target = data.comments.find(item => item.id === commentId);

                    target.enjoy += addCount;
                }

                return data;
            }),
            takeWhile(() => this.isAlive),
            share(),
        );

        this.commentList = comment.pipe(pluck('comments'));

        this.commentTotal = comment.pipe(pluck('count'));
    }

    private removeComment(id: number): () => void {
        return () => this.removed$.next(id);
    }

    onDelete(target: CommentElement & Reply) {
        const delete$ = this._commentService.deleteComment({ id: target.id, userId: this.user.id });

        this._commentService.handleOperateCommentResult(delete$, '删除成功', this.removeComment(target.id));
    }

    /**
     * 是否可以回复此评论，只有不是本人的评论内容时才可回复
     */
    canReply(comment: CommentElement & Reply) {
        return !!this.user && comment.userId === this.user.id;
    }

    /**
     * 设置评论目标
     * 1、回复评论: targetId === comment.id toUser === comment.username toUserId === comment.userId
     * 2、回复回复: targetId === comment.id toUser === reply.fromUser
     */
    setTarget(commentId: number, toUser: string, toUserId?: number): void {
        this.target = { commentId, toUser, toUserId };
    }

    private enjoyComment(commentId: number, enjoy: number): void {
        this._commentService.handleOperateCommentResult(
            this._commentService.enjoyComment({ commentId, userId: this.user.id, enjoy }),
            '',
            this.updateEnjoy(commentId, enjoy),
        );
    }

    private updateEnjoy(commentId: number, addCount: number): () => void {
        return () => this.updateEnjoy$.next({ commentId, addCount });
    }

    switchToImageTextModel(): void {
        this._router.navigate(['reply', { ...this.target }], { relativeTo: this._route });
    }

    ngOnDestroy() {
        this.isAlive = false;
    }
}
