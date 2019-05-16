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
import { MatSnackBar, MatDialog } from '@angular/material';
import { CommentTarget } from '../interface/comment.interface';
import { ReplyBaseComponent } from '../base/reply.base.component';
import { CommentRequest, ReplyRequest } from 'src/app/interface/request.interface';
import { User } from '../../auth/interface/auth.interface';
import { LoginComponent } from '../../auth/login/login.component';

@Component({
    selector: 'ratel-reply',
    templateUrl: './reply.component.html',
    styleUrls: ['./reply.component.scss'],
})
export class ReplyComponent extends ReplyBaseComponent implements OnInit, OnDestroy {
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

    @Input()
    user: User;

    @Output()
    switchTo: EventEmitter<boolean> = new EventEmitter();

    @ViewChild('autosize')
    autosize: CdkTextareaAutosize;

    @ViewChild('area')
    textarea: ElementRef;

    @ViewChild('trigger')
    trigger: ElementRef;

    content: string;

    allowComment = false;

    isAlive = true;

    contentEditable = true;

    submit$: Subject<boolean> = new Subject();

    constructor(
        private _zone: NgZone,
        public commentService: CommentService,
        private _route: ActivatedRoute,
        private _snack: MatSnackBar,
        private dialog: MatDialog,
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

        // 提示用户评论发表频率过高
        this.submit$
            .asObservable()
            .pipe(
                timestamp(),
                bufferCount(2, 0),
            )
            .subscribe(([pre, cur]) => {
                const duration = cur.timestamp - pre.timestamp;
                if (duration < 2 * 60 * 100) {
                    this._snack.open('提交频率太高了，请稍候再试!', '', this.commentService.getSnackbarConfig('warn'));
                }
            });
    }

    onFocus() {
        if (!this.user) {
            this.dialog.open(LoginComponent, { width: '500px' });
            this.trigger.nativeElement.blur();
            this.contentEditable = false;
            return;
        }

        this.placeholder = this.user.name || this.user.account;

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
        const { name, account, id } = this.user;

        return {
            articleId,
            username: name || account,
            userId: id,
            content: this.content,
        };
    }

    protected getReplyCommentParams(): ReplyRequest {
        const { toUser, commentId } = this.commentTarget;
        const { name, account, id } = this.user;

        return {
            fromUser: name || account,
            userId: id,
            content: this.content,
            toUser,
            commentId,
        };
    }

    ngOnDestroy() {
        this.isAlive = false;
    }
}
