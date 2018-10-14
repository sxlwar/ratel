import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

import { LoginComponent } from '../../auth/login/login.component';
import { NavItem } from '../../tool/interface/tool.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'ratel-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
    animations: [
        trigger('flyInOut', [
            state('in', style({ transform: 'translateX(0)', zIndex: 0 })),
            state('out', style({ transform: 'translateX(100%)', zIndex: -1 })),
            transition('out => in', [style({ transform: 'translateX(100%)' }), animate(100)]),
            transition('in => out', [animate(100, style({ transform: 'translateX(100%)' }))]),
        ]),
    ],
})
export class NavComponent implements OnInit, OnDestroy {
    @Input()
    username: string;

    @Output()
    search: EventEmitter<string> = new EventEmitter();

    @Output()
    logout: EventEmitter<boolean> = new EventEmitter();

    showSearchInput = false;

    searchCtrl: FormControl = new FormControl('');

    search$$: Subscription;

    constructor(private dialog: MatDialog, private router: Router) {}

    ngOnInit() {
        this.search$$ = this.searchCtrl.valueChanges
            .pipe(
                debounceTime(500),
                filter(value => value !== ''),
            )
            .subscribe(this.search);
    }

    onTopicChange(topic: NavItem): void {
        if (topic.topic === '') {
            this.router.navigateByUrl('/home');
        } else {
            this.router.navigate(['/', 'topic', topic.topic]);
        }
    }

    openDialog(): void {
        this.dialog.open(LoginComponent, { width: '500px' });
    }

    ngOnDestroy() {
        this.search$$.unsubscribe();
    }
}
