import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'ratel-tag',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagComponent implements OnInit {
    @Input()
    color = '#f44336';

    @Input()
    content: string;

    constructor() {}

    ngOnInit() {}
}
