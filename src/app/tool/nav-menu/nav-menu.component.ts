import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';

import { NavItem } from '../interface/tool.interface';
import { ArticleCategory } from '../../constant/constant';

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
        { label: 'Angular', selected: false, topic: ArticleCategory.angular },
        { label: 'Rxjs', selected: false, topic: ArticleCategory.rxjs },
        { label: 'TypeScript', selected: false, topic: ArticleCategory.typescript },
        { label: 'JavaScript', selected: false, topic: ArticleCategory.javascript },
        { label: 'Other', selected: false, topic: ArticleCategory.other },
    ];

    @Output()
    topicChange: EventEmitter<NavItem> = new EventEmitter();

    constructor(private location: Location) {}

    ngOnInit() {
        this.checkActivateTopic();
    }

    /**
     * 进入或用户刷新页面时检查当前页面的所处路径
     */
    private checkActivateTopic(): void {
        const paths = this.location.path().split('/').filter(item => !!item);

        if (paths.length === 0 || paths.includes('home') || paths.includes('create')) {
            this.topics[0].selected = true;
        } else {
            this.topics.forEach(item => (item.selected = paths.includes(item.topic)));
        }
    }

    onTopicSelect(target: NavItem): void {
        const old = this.topics.find(item => item.selected);

        if (old) {
            old.selected = false;
        }

        target.selected = true;

        this.topicChange.next(target);
    }
}
