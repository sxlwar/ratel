import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'ratel-topic-overview',
    templateUrl: './topic-overview.component.html',
    styleUrls: ['./topic-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicOverviewComponent implements OnInit {
    @Input()
    topic: string;

    constructor() {}

    ngOnInit() {}
}
