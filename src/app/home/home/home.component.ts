import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { ArticleService } from '../../article/providers/article.service';
import { ArticleOverview } from '../../interface/response.interface';

@Component({
    selector: 'ratel-home',
    templateUrl: './home.component.html',
    animations: [
        trigger('inOut', [
            state(
                'inactive',
                style({
                    transform: 'scale(1)',
                    zIndex: 1,
                }),
            ),
            state(
                'active',
                style({
                    transform: 'scale(1.1)',
                    zIndex: 999,
                }),
            ),
            transition('inactive => active', animate('300ms ease-in')),
            transition('active => inactive', animate('300ms ease-out')),
        ]),
    ],
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    articles: Observable<ArticleOverview[]>;

    hotArticles: Observable<ArticleOverview[]>;

    constructor(private _articleService: ArticleService, private _router: Router, private _route: ActivatedRoute) {}

    ngOnInit() {
        this.initialModel();
    }

    initialModel(): void {
        this.articles = this._articleService.getArticlesOverview({ limit: 10 });

        this.hotArticles = this._articleService.getArticlesOverview({ rank: 'enjoy', limit: 10 });
    }

    showArticle(id: number): void {
        this._router.navigate([id], { relativeTo: this._route });
    }
}
