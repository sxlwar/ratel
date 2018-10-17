import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable, Subscription } from 'rxjs';
import { catchError, mergeMap, take, switchMap } from 'rxjs/operators';

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
    ) {
        super();
    }

    getArticlesOverview(conditions: Partial<ArticleSearchRequest> = {}): Observable<ArticleOverview[]> {
        const defaultCondition: Partial<ArticleSearchRequest> = { limit: 10 };
        const condition = { ...defaultCondition, ...conditions, isOverview: true };

        return this._http
            .post<ArticleOverview[]>(this.completeApiUrl(this.articlePath, CRUDVar.SEARCH), condition)
            .pipe(catchError(this._error.handleHttpError));
    }

    getSeriesOverview(overview: Observable<SeriesOverviewRequest>): Observable<SeriesOverviewResponse> {
        return overview.pipe(
            switchMap(series =>
                this._http
                    .post<SeriesOverviewResponse>(this.completeApiUrl(this.articlePath, this.series), series)
                    .pipe(catchError(this._error.handleHttpError)),
            ),
        );
    }

    getArticle(idObs: Observable<string>): Observable<Article> {
        return idObs.pipe(
            mergeMap(id =>
                this._http
                    .get<Article>(this.completeApiUrl(this.articlePath, id))
                    .pipe(catchError(this._error.handleHttpError)),
            ),
            take(1),
        );
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
}
