import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { Subject, Observable } from 'rxjs';

@Component({
    selector: 'ratel-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    search$: Subject<string> = new Subject();

    searchObs: Observable<string>;

    showDrawer = false;

    constructor(private _register: MatIconRegistry) {
        this._register.registerFontClassAlias('icomoon');
    }

    ngOnInit(): void {
        this.searchObs = this.search$.asObservable();
    }

    onSearchState(state: boolean): void {
        this.showDrawer = state;
    }
}
