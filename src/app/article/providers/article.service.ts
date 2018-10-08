import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ArticleOverview } from '../../interface/response.interface';
import { BaseService } from '../../providers/base.service';
import { CRUDVar } from '../../constant/constant';

@Injectable()
export class ArticleService extends BaseService {
    private readonly path = 'article';

    constructor(private readonly _http: HttpClient) {
        super();
    }

    getLatestArticlesOverview(): Observable<ArticleOverview[]> {
        return this._http.post<ArticleOverview[]>(this.completeApiUrl(this.path, CRUDVar.SEARCH), {
            limit: 10,
            isOverview: true,
        });
    }
}
