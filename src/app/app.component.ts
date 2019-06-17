import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { Observable, Subject } from 'rxjs';

import { ArticleOverview } from './interface/response.interface';
import { AuthService } from './providers/auth.service';
import { map, filter } from 'rxjs/operators';
import { SubscribeService } from './providers/subscribe.service';

@Component({
    selector: 'ratel-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    search$: Subject<string> = new Subject();

    searchObs: Observable<string>;

    showDrawer$: Subject<boolean> = new Subject();

    showDrawer: Observable<boolean>;

    inHomePage: Observable<boolean>;

    constructor(
        private _register: MatIconRegistry,
        private _router: Router,
        private _route: ActivatedRoute,
        private _authService: AuthService,
        private _subscribe: SubscribeService,
    ) {
        this._register.registerFontClassAlias('icomoon');
    }

    ngOnInit(): void {
        this.initialModel();

        this.checkLoginState();
    }

    private checkLoginState(): void {
        this._authService.checkLoginState();
    }

    private initialModel() {
        this.searchObs = this.search$.asObservable();

        this.showDrawer = this.showDrawer$.asObservable();

        this.inHomePage = this._router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map((event: NavigationEnd) => event.url === '/home'),
        );
    }

    navigate(target: ArticleOverview): void {
        this._router.navigate([target.id], { relativeTo: this._route });
    }

    onSubscribe(email: string): void {
        this._subscribe.subscribe(email);
    }
}
