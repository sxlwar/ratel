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
        { label: '首页', selected: false, topic: '' },
        { label: 'Angular', selected: false, topic: 'angular' },
        { label: 'Rxjs', selected: false, topic: 'rxjs' },
        { label: 'TypeScript', selected: false, topic: 'ts' },
        { label: 'JavaScript', selected: false, topic: 'js' },
        { label: 'Other', selected: false, topic: 'other' },
    ];

    @Output()
    topicChange: EventEmitter<NavItem> = new EventEmitter();

    constructor() {}

    ngOnInit() {
        this.checkActivateTopic();
    }

    /**
     * 进入或用户刷新页面时检查当前页面的所处路径
     */
    private checkActivateTopic(): void {
        const paths = location.pathname.split('/').filter(item => !!item);

        if (paths.includes('home')) {
            this.topics[0].selected = true;
        } else {
            this.topics.forEach(item => (item.selected = paths.includes(item.topic)));
        }
    }

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
