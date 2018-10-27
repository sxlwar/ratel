import { HttpClient } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TransferState, makeStateKey } from '@angular/platform-browser';

import { Observable, Subscription, of } from 'rxjs';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';

import { CRUDVar } from '../../constant/constant';
import {
    ArticleSearchRequest,
    CreateArticleRequest,
    ArticleStatisticsUpdateRequest,
    SeriesOverviewRequest,
    ArticleUpdateRequest,
} from '../../interface/request.interface';
import {
    ArticleOverview,
    CreateArticleResponse,
    Article,
    ArticleStatistics,
    SeriesOverviewResponse,
    ArticleUpdateResponse,
} from '../../interface/response.interface';
import { BaseService } from '../../providers/base.service';
import { ErrorService } from '../../providers/error.service';

@Injectable()
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

    createArticle(data: CreateArticleRequest): Observable<CreateArticleResponse> {
        return this._http
            .post<CreateArticleResponse>(this.completeApiUrl(this.articlePath, CRUDVar.CREATE), data)
            .pipe(catchError(this._error.handleHttpError));
    }

    updateArticle(data: ArticleUpdateRequest): Observable<ArticleUpdateResponse> {
        return this._http
            .put<ArticleUpdateResponse>(this.completeApiUrl(this.articlePath, this.updatePath), data)
            .pipe(catchError(this._error.handleHttpError));
    }

    handleCreateArticleResponse<T>(response: Observable<T>, message = '创建成功'): Subscription {
        return response.subscribe(_res => {
            this._snake.open(message, '', this.snakeBarConfig);
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
}
