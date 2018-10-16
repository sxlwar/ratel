import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'ratel-comment-total',
    templateUrl: './comment-total.component.html',
    styleUrls: ['./comment-total.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentTotalComponent implements OnInit {
    @Input()
    total: string;

    constructor() {}

    ngOnInit() {}
}
