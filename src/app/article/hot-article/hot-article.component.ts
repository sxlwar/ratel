import { ChangeDetectionStrategy, Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

import { ArticleOverview } from '../../interface/response.interface';

@Component({
    selector: 'ratel-hot-article',
    templateUrl: './hot-article.component.html',
    styleUrls: ['./hot-article.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotArticleComponent implements OnInit {
    @Input()
    article: ArticleOverview;

    @Output()
    view: EventEmitter<number> = new EventEmitter();

    constructor() {}

    ngOnInit() {}
}
