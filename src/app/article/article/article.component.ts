import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, take, takeWhile } from 'rxjs/operators';

import { Article } from '../../interface/response.interface';
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

    constructor(private _router: Router, private _route: ActivatedRoute, private _articleService: ArticleService) {}

    ngOnInit() {
        this.initialModel();

        this._router.events.pipe(takeWhile(() => this.isAlive)).subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.initialModel();
            }
        });
    }

    initialModel() {
        this.article = this._articleService.getArticle(this._route.paramMap.pipe(map(param => param.get('id'))));

        this.article
            .pipe(
                map(article => article.statistics.enjoy),
                take(1),
            )
            .subscribe(like => (this.like = like));
    }

    addLike(id: number): void {
        this._articleService
            .addLike({ enjoy: 1, id })
            .pipe(map(res => res.enjoy))
            .subscribe(like => (this.like = like));
    }

    switchToImageTextModel(): void {
        this._router.navigate(['reply'], { relativeTo: this._route });
    }

    ngOnDestroy() {
        this.isAlive = false;
    }
}
