import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

import { Observable, Subject, merge } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ArticleOverview } from 'src/app/interface/response.interface';

import { ArticleService } from '../providers/article.service';

@Component({
    selector: 'ratel-article-list',
    templateUrl: './article-list.component.html',
    styleUrls: ['./article-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('flyInOut', [
            state('in', style({ transform: 'translateX(0)' })),
            transition('void => *', [style({ transform: 'translateX(-100%)' }), animate(500)]),
            transition('* => void', [animate(500, style({ transform: 'translateX(-100%)' }))]),
        ]),
    ],
})
export class ArticleListComponent implements OnInit {
    @Input()
    search: Observable<string>;

    @Input()
    display: Observable<boolean>;

    @Output()
    goTo: EventEmitter<ArticleOverview> = new EventEmitter();

    list: Observable<ArticleOverview[]>;

    close$: Subject<boolean> = new Subject();

    show: Observable<boolean>;

    constructor(private _articleService: ArticleService) {}

    ngOnInit() {
        this.list = this.search.pipe(switchMap(value => this._articleService.getArticlesOverview({ title: value })));

        this.show = merge(this.display, this.close$.asObservable());
    }
}
