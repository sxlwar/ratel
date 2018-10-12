import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { CRUDVar } from '../../constant/constant';
import { ArticleSearchRequest, CreateArticleRequest } from '../../interface/request.interface';
import { ArticleOverview, CreateArticleResponse } from '../../interface/response.interface';
import { BaseService } from '../../providers/base.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ArticleService extends BaseService {
    private readonly path = 'article';

    constructor(private readonly _http: HttpClient, private readonly _snake: MatSnackBar) {
        super();
    }

    getArticlesOverview(conditions: Partial<ArticleSearchRequest> = {}): Observable<ArticleOverview[]> {
        const defaultCondition: Partial<ArticleSearchRequest> = { limit: 10 };
        const condition = { ...defaultCondition, ...conditions, isOverview: true };

        return this._http.post<ArticleOverview[]>(this.completeApiUrl(this.path, CRUDVar.SEARCH), condition);
    }

    createArticle(data: CreateArticleRequest): Observable<CreateArticleResponse> {
        return this._http.post<CreateArticleResponse>(this.completeApiUrl(this.path, CRUDVar.CREATE), data);
    }

    handleCreateArticleResponse(response: Observable<CreateArticleResponse>): Subscription {
        return response.subscribe(_res => {
            this._snake.open('创建成功', '', this.snakeBarConfig);
        });
    }
}
