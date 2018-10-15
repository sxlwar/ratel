import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';

import { ArticleOverview } from './interface/response.interface';

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

    constructor(private _register: MatIconRegistry, private _router: Router, private _route: ActivatedRoute) {
        this._register.registerFontClassAlias('icomoon');
    }

    ngOnInit(): void {
        this.searchObs = this.search$.asObservable();

        this.showDrawer = this.showDrawer$.asObservable();
    }

    navigate(target: ArticleOverview): void {
        this._router.navigate([target.id], { relativeTo: this._route });
    }
}
