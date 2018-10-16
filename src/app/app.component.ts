import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';

import { ArticleOverview } from './interface/response.interface';
import { AuthService } from './providers/auth.service';

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

    constructor(
        private _register: MatIconRegistry,
        private _router: Router,
        private _route: ActivatedRoute,
        private _authService: AuthService,
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
    }

    navigate(target: ArticleOverview): void {
        this._router.navigate([target.id], { relativeTo: this._route });
    }
}
