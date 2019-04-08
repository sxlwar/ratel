import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ratel-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
    list = ['autocomplete', 'cascader', 'input', 'input-number', 'test', 'checkbox', 'radio', 'select'];

    constructor() {}

    ngOnInit() {}
}
