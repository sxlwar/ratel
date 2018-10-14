import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable, Subscription } from 'rxjs';
import { catchError, mergeMap, take } from 'rxjs/operators';

import { CRUDVar } from '../../constant/constant';
import {
    ArticleSearchRequest,
    CreateArticleRequest,
    ArticleStatisticsUpdateRequest,
} from '../../interface/request.interface';
import { ArticleOverview, CreateArticleResponse, Article, ArticleStatistics } from '../../interface/response.interface';
import { BaseService } from '../../providers/base.service';
import { ErrorService } from '../../providers/error.service';

@Injectable()
export class ArticleService extends BaseService {
    private readonly articlePath = 'article';

    private readonly statisticsPath = 'statistics';

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

    handleCreateArticleResponse(response: Observable<CreateArticleResponse>): Subscription {
        return response.subscribe(_res => {
            this._snake.open('创建成功', '', this.snakeBarConfig);
        });
    }
}
