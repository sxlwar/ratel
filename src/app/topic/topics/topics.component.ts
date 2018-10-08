import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { ArticleService } from '../../article/providers/article.service';
import { ArticleOverview } from '../../interface/response.interface';
import { RouteToTopicVar } from '../../constant/constant';

@Component({
    selector: 'ratel-topics',
    templateUrl: './topics.component.html',
    styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements OnInit {
    articles: Observable<ArticleOverview[]>;

    topic: Observable<string>;

    constructor(private _route: ActivatedRoute, private _articleService: ArticleService, private _router: Router) {}

    ngOnInit() {
        this.articles = this._route.params.pipe(
            mergeMap(({ topic }) => this._articleService.getArticlesOverview({ category: [topic], limit: 30 })),
        );

        this.topic = this._route.params.pipe(map(({ topic }) => RouteToTopicVar[topic]));
    }

    showArticle(id: number) {
        this._router.navigate([id], { relativeTo: this._route });
    }
}
