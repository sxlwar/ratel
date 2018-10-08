import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { NavItem } from '../interface/tool.interface';

@Component({
    selector: 'ratel-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.scss'],
    animations: [
        trigger('moduleState', [
            state('inactive', style({ opacity: 0 })),
            state('active', style({ opacity: 1 })),
            transition('inactive => active', animate('300ms ease-in')),
            transition('active => inactive', animate('300ms ease-out')),
        ]),
    ],
})
export class NavMenuComponent implements OnInit {
    topics: NavItem[] = [
        { label: '首页', selected: true },
        { label: 'Angular', selected: false },
        { label: 'Rxjs', selected: false },
        { label: 'TypeScript', selected: false },
        { label: 'JavaScript', selected: false },
        { label: 'Other', selected: false },
    ];

    @Output()
    topicChange: EventEmitter<NavItem> = new EventEmitter();

    constructor() {}

    ngOnInit() {}

    onTopicSelect(target: NavItem): void {
        const old = this.topics.find(item => item.selected);

        if (old === target) {
            return;
        } else {
            old.selected = false;
            target.selected = true;

            this.topicChange.next(target);
        }
    }
}
