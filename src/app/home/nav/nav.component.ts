import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnDestroy, OnInit, Output, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { debounceTime, filter, takeWhile } from 'rxjs/operators';

import { User } from '../../auth/interface/auth.interface';
import { LoginComponent } from '../../auth/login/login.component';
import { AuthService } from '../../providers/auth.service';
import { NavItem } from '../../tool/interface/tool.interface';
import { ArticleCategory } from 'src/app/constant/constant';

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
    @Output()
    search: EventEmitter<string> = new EventEmitter();

    @Output()
    inputState: EventEmitter<boolean> = new EventEmitter();

    showSearchInput = false;

    searchCtrl: FormControl = new FormControl('');

    user: User;

    isAlive = true;

    isBrowser = isPlatformBrowser(this._platformId);

    constructor(
        private dialog: MatDialog,
        private router: Router,
        private _authService: AuthService,
        @Inject(PLATFORM_ID) private _platformId: object,
    ) {}

    ngOnInit() {
        this.launch();
        this.initialModel();
    }

    private launch(): void {
        this.searchCtrl.valueChanges
            .pipe(
                debounceTime(500),
                filter(value => value !== ''),
                takeWhile(() => this.isAlive),
            )
            .subscribe(this.search);

        this.searchCtrl.valueChanges.pipe(takeWhile(() => this.isAlive)).subscribe(_ => this.inputState.next(true));
    }

    private initialModel(): void {
        this._authService.userObs.subscribe(user => (this.user = user));
    }

    onTopicChange(topic: NavItem): void {
        switch (topic.topic) {
            case '':
                this.router.navigateByUrl('/home');
                break;
            case ArticleCategory.NGX_FORMLY_ZORRO:
                this.router.navigate(['/', 'ngx-formly-zorro']);
                break;
            default:
                this.router.navigate(['/', 'topic', topic.topic]);
        }
    }

    openDialog(): void {
        this.dialog.open(LoginComponent, { width: '500px' });
    }

    logout(): void {
        this._authService.logout();
    }

    ngOnDestroy() {
        this.isAlive = false;
    }
}
