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

    username: string;

    showBtn = false;

    constructor() {}

    ngOnInit() {
        // TODO 获取当前用户名称； username；
    }

    showOperateBtn(): void {
        // if (!this.username) {
        //     return;
        // }

        // if (this.comment.username === this.username || this.comment.fromUser === this.username) {
        //     this.showBtn = true;
        // }

        this.showBtn = true;
    }

    hideOperateBtn(): void {
        this.showBtn = false;
    }
}
