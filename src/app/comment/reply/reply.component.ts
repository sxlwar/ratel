import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { CommentService } from '../providers/comment.service';
import { ActivatedRoute } from '@angular/router';

import { take, throttleTime, takeWhile, timestamp, bufferCount } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { CommentTarget } from '../interface/comment.interface';
import { ReplyBaseComponent } from '../base/reply.base.component';
import { CommentRequest, ReplyRequest } from 'src/app/interface/request.interface';

@Component({
    selector: 'ratel-reply',
    templateUrl: './reply.component.html',
    styleUrls: ['./reply.component.scss'],
})
export class ReplyComponent extends ReplyBaseComponent implements OnInit, OnDestroy {
    @ViewChild('autosize')
    autosize: CdkTextareaAutosize;

    @ViewChild('area')
    textarea: ElementRef;

    content: string;

    allowComment = false;

    isAlive = true;

    @Input()
    isComment = false;

    @Input()
    set placeholder(input: string) {
        if (input !== null && input !== undefined) {
            this._placeholder = input;
            this.contentEditable = false;
            this.allowComment = true;
        }
    }

    private _placeholder = '输入评论内容';

    get placeholder(): string {
        return this._placeholder;
    }

    @Input()
    commentTarget: CommentTarget;

    @Output()
    switchTo: EventEmitter<boolean> = new EventEmitter();

    contentEditable = true;

    submit$: Subject<boolean> = new Subject();

    constructor(
        private _zone: NgZone,
        public commentService: CommentService,
        private _route: ActivatedRoute,
        private _snack: MatSnackBar,
    ) {
        super(commentService);
    }

    ngOnInit() {
        // 限制评论发表的频率
        this.submit$
            .asObservable()
            .pipe(
                throttleTime(2 * 60 * 1000),
                takeWhile(() => this.isAlive),
            )
            .subscribe(_ => this.submit());

        this.submit$
            .asObservable()
            .pipe(
                timestamp(),
                bufferCount(2, 0),
            )
            .subscribe(([pre, cur]) => {
                const duration = cur.timestamp - pre.timestamp;
                if (duration < 2 * 60 * 100) {
                    this._snack.open('提交频率太高了，请稍候再试!', '', this.commentService.snakeBarConfig);
                }
            });
    }

    onFocus() {
        // todo 检查用户是否已经登录 登录-->显示用户名 未登录-->显示登录弹窗
        // TODO 修改placeholder 为用户名

        this.placeholder = 'sxlwar';

        this.allowComment = true;
        setTimeout(() => {
            this.textarea.nativeElement.focus();
            this._zone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent());
        }, 0);
    }

    closeReply(): void {
        this.allowComment = false;
        this.contentEditable = true;
    }

    onFileOver(event: any): void {
        console.log(event);
    }

    protected getCreateCommentParams(): CommentRequest {
        const articleId = +this._route.snapshot.paramMap.get('id');

        return {
            articleId,
            username: 'sxlwar',
            userId: 20088392,
            content: this.content,
        };
    }

    protected getReplyCommentParams(): ReplyRequest {
        const { toUser, commentId } = this.commentTarget;

        return {
            fromUser: 'sxlwar',
            userId: 20088392,
            content: this.content,
            toUser,
            commentId,
        };
    }

    ngOnDestroy() {
        this.isAlive = false;
    }
}
