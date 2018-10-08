import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

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

    constructor(private _articleService: ArticleService) {}

    ngOnInit() {
        this.launch();
    }

    launch(): void {
        this.articles = this._articleService.getLatestArticlesOverview();

        this.articles.subscribe(v => console.log(v));
    }
}
