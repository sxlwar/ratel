import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';

@Component({
    selector: 'ratel-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(private _register: MatIconRegistry) {
        this._register.registerFontClassAlias('icomoon');
    }

    ngOnInit(): void {
    }
}
