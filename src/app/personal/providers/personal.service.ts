import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { uniq } from 'lodash';
import { Observable, Subscription, zip } from 'rxjs';
import { catchError, mergeMap, map } from 'rxjs/operators';

import { StoreRequest } from '../../interface/request.interface';
import { BookmarkResponse, StoreResponse } from '../../interface/response.interface';
import { AuthService } from '../../providers/auth.service';
import { BaseService } from '../../providers/base.service';
import { ErrorService } from '../../providers/error.service';

export enum StoreAction {
    ADD = 'add',
    REMOVE = 'remove',
    CLEAR = 'clear',
}

@Injectable({
    providedIn: 'root',
})
export class PersonalService extends BaseService {
    private readonly storePath = 'store';

    private readonly bookmarkPath = 'bookmark';

    constructor(
        private _error: ErrorService,
        private _snake: MatSnackBar,
        private _http: HttpClient,
        private _authService: AuthService,
    ) {
        super();
    }

    storeArticle(request: Observable<StoreRequest>, callback?: () => void): Subscription {
        const messageMap = {
            add: '已添加到收藏夹',
            remove: '已从收藏夹移除',
            clear: '收藏夹已清空',
        };

        return request
            .pipe(
                mergeMap(data =>
                    this._http
                        .post<StoreResponse>(this.completeApiUrl(this._authService.path, this.storePath), data)
                        .pipe(
                            map(res => (res.isSuccess ? messageMap[data.operate] : '操作失败')),
                            catchError(this._error.handleHttpError),
                        ),
                ),
            )
            .subscribe(message => {
                this._snake.open(message, '', this.getSnackbarConfig('success'));

                this.updateUserInfo(request);

                if (callback) {
                    callback();
                }
            });
    }

    private updateUserInfo(request: Observable<StoreRequest>): void {
        zip(request, this._authService.userObs).subscribe(([req, user]) => {
            const { operate, articleId } = req;
            const result = { ...user };

            if (operate === StoreAction.ADD) {
                result.storedArticles = uniq([...user.storedArticles, articleId]);
            } else if (operate === StoreAction.REMOVE) {
                result.storedArticles = user.storedArticles.filter(item => item !== articleId);
            } else {
                result.storedArticles = [];
            }

            this._authService.user$.next(result);
        });
    }

    getBookmarks(userId: Observable<number>): Observable<BookmarkResponse> {
        return userId.pipe(
            mergeMap(id =>
                this._http
                    .post<BookmarkResponse>(this.completeApiUrl(this._authService.path, this.bookmarkPath), { id })
                    .pipe(catchError(this._error.handleHttpError)),
            ),
        );
    }
}
