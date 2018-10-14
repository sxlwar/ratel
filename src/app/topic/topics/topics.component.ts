import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { ArticleService } from '../../article/providers/article.service';
import { ArticleOverview, SeriesOverviewResponse } from '../../interface/response.interface';
import { RouteToTopicVar } from '../../constant/constant';
import { SeriesOverviewRequest } from 'src/app/interface/request.interface';

@Component({
    selector: 'ratel-topics',
    templateUrl: './topics.component.html',
    styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements OnInit {
    articles: Observable<ArticleOverview[]>;

    topic: Observable<string>;

    statistics: Observable<SeriesOverviewResponse>;

    constructor(private _route: ActivatedRoute, private _articleService: ArticleService, private _router: Router) {}

    ngOnInit() {
        this.articles = this._route.params.pipe(
            mergeMap(({ topic }) => this._articleService.getArticlesOverview({ category: [topic], limit: 30 })),
        );

        this.topic = this._route.params.pipe(map(({ topic }) => RouteToTopicVar[topic]));

        this.statistics = this._articleService.getSeriesOverview(
            this.topic.pipe(map(series => ({ series: series.toLowerCase() } as SeriesOverviewRequest))),
        );
    }

    showArticle(id: number) {
        this._router.navigate([id], { relativeTo: this._route });
    }
}
