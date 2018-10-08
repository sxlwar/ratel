import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { ArticleOverview } from '../../interface/response.interface';

@Component({
    selector: 'ratel-article-overview',
    templateUrl: './article-overview.component.html',
    styleUrls: ['./article-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleOverviewComponent implements OnInit {
    @Input()
    article: ArticleOverview;

    @Output()
    view: EventEmitter<number> = new EventEmitter();

    constructor() {}

    ngOnInit() {}
}
