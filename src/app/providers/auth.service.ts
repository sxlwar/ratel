import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { uniq } from 'lodash';
import { BehaviorSubject, Observable, Subscription, zip } from 'rxjs';
import { catchError, filter, map, mergeMap, take } from 'rxjs/operators';

import { GithubAuthConfig, User } from '../auth/interface/auth.interface';
import { StoreRequest } from '../interface/request.interface';
import { BookmarkResponse, LogoutResponse, StoreResponse } from '../interface/response.interface';
import { BaseService } from './base.service';
import { ErrorService } from './error.service';

export enum StoreAction {
    ADD = 'add',
    REMOVE = 'remove',
    CLEAR = 'clear',
}

@Injectable()
export class AuthService extends BaseService {
    private readonly path = 'auth';

    private readonly githubConfigPath = 'github/config';

    private readonly githubLoginPath = 'github/code';

    private readonly logoutPath = 'logout';

    private readonly userInfoPath = 'user';

    private readonly storePath = 'store';

    private readonly bookmarkPath = 'bookmark';

    private readonly githubAuthURI = 'https://github.com/login/oauth/authorize';

    private readonly storedUserId = 'githubId';

    private user$: BehaviorSubject<User> = new BehaviorSubject(null);

    userObs: Observable<User>;

    constructor(
        private _http: HttpClient,
        private _route: ActivatedRoute,
        private _error: ErrorService,
        private _snake: MatSnackBar,
    ) {
        super();

        this.monitorGithubUserInfo();

        this.userObs = this.user$.asObservable();
    }

    private monitorGithubUserInfo(): void {
        this._route.queryParams
            .pipe(
                filter(params => params && params['code'] && params['state']),
                mergeMap(({ code, state }) =>
                    this._http.get<User>(this.completeApiUrl(this.path, this.githubLoginPath), {
                        params: { code, state },
                    }),
                ),
                take(1),
            )
            .subscribe(user => {
                this.user$.next(user);

                this.storeUserId(user.githubId);
            });
    }

    private storeUserId(id: number): void {
        localStorage.setItem(this.storedUserId, String(id));
    }

    private clearUserId(): void {
        localStorage.removeItem(this.storedUserId);
    }

    private getUserId(): number | undefined {
        return +localStorage.getItem(this.storedUserId);
    }

    /**
     * 用户如果没有执行出退出操作，重新向服务器获取用户的信息；
     * 注意不要使用.subscribe(this.user$)这种写法，会导致输出流上发出 complete 通知，以后的订阅将拿不到数据。
     */
    checkLoginState(): void {
        const id = this.getUserId();

        if (id) {
            this._http
                .post<User>(this.completeApiUrl(this.path, this.userInfoPath), { id })
                .pipe(catchError(this._error.handleHttpError))
                .subscribe(user => this.user$.next(user));
        }
    }

    /**
     * 通知服务器删除用户信息，同时删除本地的用户id
     */
    logout(): Subscription {
        return this._http
            .post<LogoutResponse>(this.completeApiUrl(this.path, this.logoutPath), { id: this.getUserId() })
            .pipe(catchError(this._error.handleHttpError))
            .subscribe(res => {
                if (res.isLogout) {
                    this.clearUserId();

                    this.user$.next(null);
                }
            });
    }

    /**
     * 获取 github 身份验证所需要的配置项，主要是 clientId;
     * 重定向地址使用 location.href， 这样用户登录后还会访问到原来的页面。
     */
    getGithubAddress(): Observable<string> {
        return this._http.get<GithubAuthConfig>(this.completeApiUrl(this.path, this.githubConfigPath)).pipe(
            map(
                config =>
                    `${this.githubAuthURI}?client_id=${config.clientId}&redirect_uri=${
                        location.href.split('?')[0]
                    }&scope=user&state=${config.state}`,
            ),
            catchError(this._error.handleHttpError),
        );
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
                    this._http.post<StoreResponse>(this.completeApiUrl(this.path, this.storePath), data).pipe(
                        map(res => (res.isSuccess ? messageMap[data.operate] : '操作失败')),
                        catchError(this._error.handleHttpError),
                    ),
                ),
            )
            .subscribe(message => {
                this._snake.open(message, '', this.snakeBarConfig);

                this.updateUserInfo(request);

                if (callback) {
                    callback();
                }
            });
    }

    private updateUserInfo(request: Observable<StoreRequest>): void {
        zip(request, this.userObs).subscribe(([req, user]) => {
            const { operate, articleId } = req;
            const result = { ...user };

            if (operate === StoreAction.ADD) {
                result.storedArticles = uniq([...user.storedArticles, articleId]);
            } else if (operate === StoreAction.REMOVE) {
                result.storedArticles = user.storedArticles.filter(item => item !== articleId);
            } else {
                result.storedArticles = [];
            }

            this.user$.next(result);
        });
    }

    getBookmarks(userId: Observable<number>): Observable<BookmarkResponse> {
        return userId.pipe(
            mergeMap(id =>
                this._http
                    .post<BookmarkResponse>(this.completeApiUrl(this.path, this.bookmarkPath), { id })
                    .pipe(catchError(this._error.handleHttpError)),
            ),
        );
    }
}
