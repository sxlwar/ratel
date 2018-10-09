import { Component, EventEmitter, Input, OnInit, OnDestroy, Output, ViewEncapsulation } from '@angular/core';

import { from, Subject, zip } from 'rxjs';
import { groupBy, mergeMap, partition, reduce, takeWhile } from 'rxjs/operators';
import { CommentResponse, CommentElement, Reply } from 'src/app/interface/response.interface';

const mock = {
    comments: [
        {
            id: 1,
            username: '梅超风',
            userId: 0,
            createdAt: '2018-09-30 15:48:58',
            content: '看看能不能评论',
            enjoy: 0,
            articleId: 2,
            isDeleted: false,
            replies: [
                {
                    id: 1,
                    createdAt: '2018-09-30 17:23:41',
                    content: '把丢了的九阴真经给我找回来',
                    fromUser: '黄药师',
                    userId: 0,
                    toUser: '梅超风',
                },
                {
                    id: 2,
                    createdAt: '2018-09-30 17:27:55',
                    content: '把丢了的九阴真经给我找回来',
                    fromUser: '黄药师',
                    userId: 0,
                    toUser: '梅超风',
                },
                {
                    id: 3,
                    createdAt: '2018-09-30 17:52:21',
                    content: '归云庄有形无神',
                    fromUser: '黄药师',
                    userId: 0,
                    toUser: '陆乘风',
                },
            ],
        },
        {
            id: 2,
            username: '陈玄风',
            userId: 0,
            createdAt: '2018-09-30 15:50:23',
            content: '我也来评论一下',
            enjoy: 22,
            articleId: 2,
            isDeleted: false,
            replies: [],
        },
        {
            id: 3,
            username: '黄药师',
            userId: 0,
            createdAt: '2018-09-30 15:50:49',
            content: '为师也来看一下',
            enjoy: 0,
            articleId: 2,
            isDeleted: false,
            replies: [],
        },
        {
            id: 4,
            username: '陆乘风',
            userId: 0,
            createdAt: '2018-09-30 15:51:26',
            content: '坐着轮椅赶来',
            enjoy: 0,
            articleId: 2,
            isDeleted: true,
            replies: [],
        },
    ],
    count: 4,
};

@Component({
    selector: 'ratel-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit, OnDestroy {
    @Input()
    set comment(input: CommentResponse) {
        if (!!input) {
            this.commentList = input.comments;
            this.commentCount = input.count;
        }
    }

    @Output()
    reply: EventEmitter<any> = new EventEmitter();

    @Output()
    delete: EventEmitter<any> = new EventEmitter();

    @Output()
    update: EventEmitter<any> = new EventEmitter();

    commentList: any[] = mock.comments;

    commentCount = 0;

    /**
     * content need to edit;
     */
    editContent: Subject<string> = new Subject();

    /**
     * current user
     */
    username: string;

    /**
     * @ignore
     */
    isAlive = true;

    toUser: string;

    constructor() {}

    ngOnInit() {
        // TODO 获取当前用户的名称；username;
    }

    /**
     * 合并comment list 和 reply list 的数据，生成完成的 comment list 列表；
     * @param data comment list response
     */
    private createCommentList(data: any): void {}

    /**
     * Reply comment
     */
    onReply(content: string, comment: any, type: number): void {}

    /**
     * Delete comment
     */
    onDelete(comment: any): void {}

    /**
     * Update comment
     */
    onUpdate(content: string, comment: any): void {}

    /**
     * 是否可以回复此评论，只有不是本人的评论内容时才可回复
     */
    canReply(comment: CommentElement & Reply) {
        const name = comment.username || comment.fromUser;

        return this.username !== name;
    }

    /**
     * @ignore
     */
    private accumulate<T>(acc: T[], cur: T): T[] {
        return [...acc, cur];
    }

    setToUser(user: string): void {
        this.toUser = user;
    }

    enjoyComment(): void {
        console.log('enjoy comment');
    }

    /**
     * @ignore
     */
    ngOnDestroy() {
        this.isAlive = false;
    }
}
