import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { catchError, filter, map, mergeMap, take } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { GithubAuthConfig, User } from '../auth/interface/auth.interface';
import { LogoutResponse } from '../interface/response.interface';
import { BaseService } from './base.service';
import { ErrorService } from './error.service';

@Injectable()
export class AuthService extends BaseService {
    public readonly path = 'auth';

    private readonly githubConfigPath = 'github/config';

    private readonly githubLoginPath = 'github/code';

    private readonly logoutPath = 'logout';

    private readonly userInfoPath = 'user';

    private readonly githubAuthURI = 'https://github.com/login/oauth/authorize';

    private readonly storedUserId = 'githubId';

    public user$: BehaviorSubject<User> = new BehaviorSubject(null);

    userObs: Observable<User>;

    isBrowser = isPlatformBrowser(this._platformId);

    constructor(
        private _http: HttpClient,
        private _route: ActivatedRoute,
        private _error: ErrorService,
        @Inject(PLATFORM_ID) private _platformId: Object,
    ) {
        super();

        if (this.isBrowser) {
            this.monitorGithubUserInfo();
        }

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
        return this.isBrowser ? +localStorage.getItem(this.storedUserId) : null;
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
     */
    getGithubAddress(redirectPath: string): Observable<string> {
        return this._http.get<GithubAuthConfig>(this.completeApiUrl(this.path, this.githubConfigPath)).pipe(
            map(
                config =>
                    `${this.githubAuthURI}?client_id=${
                        config.clientId
                    }&redirect_uri=${environment.githubAuthRedirectAddress + redirectPath}&scope=user&state=${
                        config.state
                    }`,
            ),
            catchError(this._error.handleHttpError),
        );
    }
}
