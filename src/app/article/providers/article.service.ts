import { isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { makeStateKey, TransferState } from '@angular/platform-browser';

import { empty, Observable, of, Subscription } from 'rxjs';
import { catchError, filter, mergeMap, switchMap, tap } from 'rxjs/operators';

import { CRUDVar } from '../../constant/constant';
import {
    ArticleSearchRequest,
    ArticleStatisticsUpdateRequest,
    ArticleUpdateRequest,
    CreateArticleRequest,
    SeriesOverviewRequest,
} from '../../interface/request.interface';
import {
    Article,
    ArticleDeleteResponse,
    ArticleOverview,
    ArticleStatistics,
    ArticleUpdateResponse,
    SeriesOverviewResponse,
} from '../../interface/response.interface';
import { BaseService } from '../../providers/base.service';
import { ErrorService } from '../../providers/error.service';
import { ConfirmComponent } from '../../tool/confirm/confirm.component';

@Injectable({
    providedIn: 'root'
})
export class ArticleService extends BaseService {
    private readonly articlePath = 'article';

    private readonly statisticsPath = 'statistics';

    private readonly updatePath = 'update';

    private readonly series = 'series';

    constructor(
        private readonly _http: HttpClient,
        private readonly _snake: MatSnackBar,
        private readonly _error: ErrorService,
        private readonly transferState: TransferState,
        @Inject(PLATFORM_ID) private _platformId: Object,
        private dialog: MatDialog,
    ) {
        super();
    }

    getArticlesOverview(conditions: Partial<ArticleSearchRequest> = {}): Observable<ArticleOverview[]> {
        const defaultCondition: Partial<ArticleSearchRequest> = { limit: 500 };
        const condition = { ...defaultCondition, ...conditions, isOverview: true };

        return this.universalRequest(
            this._http
                .post<ArticleOverview[]>(this.completeApiUrl(this.articlePath, CRUDVar.SEARCH), condition)
                .pipe(catchError(this._error.handleHttpError)),
            this.articlePath,
            CRUDVar.SEARCH,
            JSON.stringify(condition),
        );
    }

    getSeriesOverview(overview: Observable<SeriesOverviewRequest>): Observable<SeriesOverviewResponse> {
        return this.universalRequest(
            overview.pipe(
                switchMap(series =>
                    this._http
                        .post<SeriesOverviewResponse>(this.completeApiUrl(this.articlePath, this.series), series)
                        .pipe(catchError(this._error.handleHttpError)),
                ),
            ),
            this.articlePath,
            this.series,
        );
    }

    getArticle(idObs: Observable<string>): Observable<Article> {
        return idObs.pipe(
            filter(id => id != null),
            mergeMap(id =>
                this.universalRequest(
                    this._http
                        .get<Article>(this.completeApiUrl(this.articlePath, id))
                        .pipe(catchError(this._error.handleHttpError)),
                    this.articlePath,
                    id,
                ),
            ),
        );
    }

    private universalRequest<T>(request: Observable<T>, ...data: Array<string | number>): Observable<T> {
        const identifier = data.join('-');
        const result = this.checkTransferStateResult<T>(identifier);

        if (result) {
            return of(result);
        } else {
            return request.pipe(tap(res => this.makeStateKey(res, identifier)));
        }
    }

    addLike(data: ArticleStatisticsUpdateRequest): Observable<Partial<ArticleStatistics>> {
        return this._http.put(this.completeApiUrl(this.statisticsPath, CRUDVar.UPDATE), data);
    }

    /**
     * TODO: 后台响应返回错了，暂时就用number，就是文章的id; 实际返回的响应应该是 CreateArticleResponse;
     */
    createArticle(data: CreateArticleRequest): Observable<number> {
        return this._http
            .post<number>(this.completeApiUrl(this.articlePath, CRUDVar.CREATE), data)
            .pipe(catchError(this._error.handleHttpError));
    }

    updateArticle(data: ArticleUpdateRequest): Observable<ArticleUpdateResponse> {
        return this._http
            .put<ArticleUpdateResponse>(this.completeApiUrl(this.articlePath, this.updatePath), data)
            .pipe(catchError(this._error.handleHttpError));
    }

    handleOperateArticleResponse<T>(response: Observable<T>, message = '创建成功'): Subscription {
        return response.subscribe(_res => {
            this._snake.open(message, '', this.getSnackbarConfig('success'));
        });
    }

    private makeStateKey(value: any, identifier: string): void {
        if (isPlatformServer(this._platformId)) {
            const key = makeStateKey(identifier);

            this.transferState.set(key, value);
        }
    }

    private checkTransferStateResult<T>(identifier: string): T {
        const key = makeStateKey<T>(identifier);

        if (this.transferState.hasKey(key)) {
            const result = this.transferState.get(key, null);
            this.transferState.remove(key);

            return result;
        }
    }

    deleteArticle(id: number): Observable<ArticleDeleteResponse> {
        const request = this._http
            .request('DELETE', this.completeApiUrl(this.articlePath, CRUDVar.DELETE), { body: { id } })
            .pipe(catchError(this._error.handleHttpError));

        return this.dialog
            .open(ConfirmComponent, { data: { title: '', message: '确认后此文章将无法找回，确定要删除这篇文章吗？' } })
            .afterClosed()
            .pipe(switchMap(confirmed => (confirmed ? request : empty())));
    }
}
