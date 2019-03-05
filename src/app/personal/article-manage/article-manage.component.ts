import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { Observable, Subject, combineLatest } from 'rxjs';
import { ArticleOverview } from '../../interface/response.interface';

import { AuthService } from '../../providers/auth.service';
import { ArticleService } from 'src/app/article/providers/article.service';
import { map, filter, share, switchMap, startWith, scan } from 'rxjs/operators';
import { uniqBy } from 'lodash';

@Component({
    selector: 'ratel-article-manage',
    templateUrl: './article-manage.component.html',
    styleUrls: ['./article-manage.component.scss'],
})
export class ArticleManageComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = ['title', 'createdAt', 'isPublished', 'operate'];

    articles: Observable<MatTableDataSource<ArticleOverview>>;

    count: Observable<number>;

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    isAlive = true;

    private delete$: Subject<number> = new Subject();

    private publish$: Subject<ArticleOverview> = new Subject();

    constructor(private _authService: AuthService, private _articleService: ArticleService) {}

    ngOnInit() {
        this.initialModel();
    }

    initialModel() {
        const response = this._authService.userObs.pipe(
            filter(user => !!user),
            switchMap(user => this._articleService.getArticlesOverview({ userId: user.id, allState: true })),
        );

        const getIds = <T>(obs: Observable<T>) =>
            obs.pipe(
                startWith(null),
                scan((acc: T[], cur: T) => [...acc, cur], []),
            );

        this.articles = combineLatest(
            response,
            getIds(this.delete$.asObservable()),
            getIds(this.publish$.asObservable()).pipe(
                map(data => uniqBy([...data].reverse(), 'id').filter(item => !!item)),
            ),
        ).pipe(
            map(([articles, deleteIds, changedArticles]) => {
                const data = new MatTableDataSource(
                    articles.filter(article => !deleteIds.includes(article.id)).map(article => {
                        const ids = changedArticles.map(item => item.id);

                        return ids.includes(article.id)
                            ? {
                                  ...article,
                                  isPublished: changedArticles.find(item => item.id === article.id).isPublished,
                              }
                            : article;
                    }),
                );

                data.paginator = this.paginator;
                data.sort = this.sort;
                return data;
            }),
        );
    }

    remove(row: ArticleOverview): void {
        const request = this._articleService.deleteArticle(row.id).pipe(share());

        this._articleService.handleOperateArticleResponse(request, '删除成功');

        request.pipe(filter(res => res.isDeleted)).subscribe(_ => this.delete$.next(row.id));
    }

    publish(row: ArticleOverview): void {
        const request = this._articleService.updateArticle({ id: row.id, isPublish: !row.isPublished });

        this._articleService.handleOperateArticleResponse(request, '状态更新成功');

        request
            .pipe(filter(res => res.isUpdated))
            .subscribe(_ => this.publish$.next({ ...row, isPublished: !row.isPublished }));
    }

    ngOnDestroy(): void {
        this.isAlive = false;
    }
}
