import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ArticleOverview } from '../../interface/response.interface';
import { BaseService } from '../../providers/base.service';
import { CRUDVar } from '../../constant/constant';
import { ArticleSearchRequest } from '../../interface/request.interface';

@Injectable()
export class ArticleService extends BaseService {
    private readonly path = 'article';

    constructor(private readonly _http: HttpClient) {
        super();
    }

    getArticlesOverview(conditions: Partial<ArticleSearchRequest> = {}): Observable<ArticleOverview[]> {
        const defaultCondition: Partial<ArticleSearchRequest> = { limit: 10 };
        const condition = { ...defaultCondition, ...conditions, isOverview: true };

        return this._http.post<ArticleOverview[]>(this.completeApiUrl(this.path, CRUDVar.SEARCH), condition);
    }
}
