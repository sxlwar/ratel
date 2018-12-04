import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ArticleOverview } from 'src/app/interface/response.interface';
import { ArticleAnimation } from '../article.animation';
import { ArticleService } from '../providers/article.service';

@Component({
    selector: 'ratel-article-list',
    templateUrl: './article-list.component.html',
    styleUrls: ['./article-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [ArticleAnimation],
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
