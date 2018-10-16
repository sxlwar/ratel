import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';

import { CommentElement, Reply } from '../../interface/response.interface';
import { User } from '../../auth/interface/auth.interface';

@Component({
    selector: 'ratel-operate-comment',
    templateUrl: './operate-comment.component.html',
    styleUrls: ['./operate-comment.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperateCommentComponent implements OnInit {
    @Input()
    comment: CommentElement & Reply;

    @Output()
    delete: EventEmitter<any> = new EventEmitter();

    @Input()
    user: User;

    showBtn = false;

    constructor() {}

    ngOnInit() {}

    showOperateBtn(): void {
        if (!this.user.id) {
            return;
        }

        if (this.comment.userId === this.user.id) {
            this.showBtn = true;
        }
    }

    hideOperateBtn(): void {
        this.showBtn = false;
    }
}
