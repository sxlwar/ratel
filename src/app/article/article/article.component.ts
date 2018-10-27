import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { combineLatest, Observable, zip } from 'rxjs';
import { filter, map, takeWhile, tap } from 'rxjs/operators';

import { User } from '../../auth/interface/auth.interface';
import { Article } from '../../interface/response.interface';
import { AuthService, StoreAction } from '../../providers/auth.service';
import { ArticleService } from '../providers/article.service';

@Component({
    selector: 'ratel-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss'],
    animations: [
        trigger('giveMeFive', [
            transition(':increment', [
                style({ color: 'red', transform: 'scale(1.5)' }),
                animate('0.5s ease-out', style('*')),
            ]),
        ]),
    ],
})
export class ArticleComponent implements OnInit, OnDestroy {
    article: Observable<Article>;

    like = 0;

    isAlive = true;

    user: Observable<User>;

    private isStored: Observable<boolean>;

    storeIcon: Observable<string>;

    tooltip: Observable<string>;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _articleService: ArticleService,
        private _authService: AuthService,
    ) {}

    ngOnInit() {
        this.initialModel();

        this._router.events.pipe(takeWhile(() => this.isAlive)).subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.initialModel();
            }
        });
    }

    initialModel() {
        const articleId = this._route.paramMap.pipe(map(param => param.get('id')));

        this.article = this._articleService
            .getArticle(articleId)
            .pipe(tap(article => (this.like = article.statistics.enjoy)));

        this.user = this._authService.userObs;

        this.isStored = combineLatest(this.user.pipe(filter(item => !!item)), articleId.pipe(map(id => +id))).pipe(
            map(([user, id]) => user.storedArticles.includes(id)),
        );

        this.storeIcon = this.isStored.pipe(map(is => (is ? 'icon-delete' : 'icon-star')));

        this.tooltip = this.isStored.pipe(map(is => (is ? '取消收藏' : '收藏')));
    }

    addLike(id: number): void {
        this._articleService
            .addLike({ enjoy: 1, id })
            .pipe(map(res => res.enjoy))
            .subscribe(like => (this.like = like));
    }

    storeArticle(): void {
        const request = zip(
            this._route.paramMap.pipe(map(param => +param.get('id'))),
            this.user.pipe(map(user => user.id)),
            this.isStored.pipe(map(stored => (stored ? StoreAction.REMOVE : StoreAction.ADD))),
        ).pipe(map(([articleId, id, operate]) => ({ id, articleId, operate })));

        this._authService.storeArticle(request);
    }

    switchToImageTextModel(): void {
        this._router.navigate(['reply'], { relativeTo: this._route });
    }

    ngOnDestroy() {
        this.isAlive = false;
    }
}
