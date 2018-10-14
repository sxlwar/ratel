import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CommentElement, Reply } from 'src/app/interface/response.interface';

@Component({
    selector: 'ratel-operate-comment',
    templateUrl: './operate-comment.component.html',
    styleUrls: ['./operate-comment.component.scss'],
})
export class OperateCommentComponent implements OnInit {
    @Input()
    comment: CommentElement & Reply;

    @Output()
    delete: EventEmitter<any> = new EventEmitter();

    userId = 20088392;

    showBtn = false;

    constructor() {}

    ngOnInit() {
        // TODO 获取当前用户;
    }

    showOperateBtn(): void {
        if (!this.userId) {
            return;
        }

        if (this.comment.userId === this.userId ) {
            this.showBtn = true;
        }
    }

    hideOperateBtn(): void {
        this.showBtn = false;
    }
}
