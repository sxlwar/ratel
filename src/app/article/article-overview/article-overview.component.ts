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
    set article(input: ArticleOverview) {
        if (!!input) {
            this._article = input;

            this.setCoverImage();
        }
    }

    private _article: ArticleOverview;

    image = 'landscape_0.jpeg';

    get article(): ArticleOverview {
        return this._article;
    }

    @Output()
    view: EventEmitter<number> = new EventEmitter();

    constructor() {}

    ngOnInit() {}

    setCoverImage() {
        const { category, thumbnail } = this.article;
        const imageMap = {
            angular: 'landscape_0.jpeg',
            typescript: 'landscape_1.jpeg',
            rxjs: 'landscape_2.jpeg',
            javascript: 'landscape_3.jpeg',
            other: 'landscape_4.jpeg',
        };

        if (thumbnail ) {
            this.image = thumbnail;
        } else {
            this.image = `../../../assets/images/${imageMap[category[category.length - 1].toLowerCase()] || 'landscape_5.jpeg'}`;
        }
    }
}
