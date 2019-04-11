import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
    selector: 'ratel-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
    list = [
        'autocomplete',
        'cascader',
        'input',
        'textarea',
        'input-number',
        'checkbox',
        'radio',
        'select',
        'datepicker',
        'yearpicker',
        'weekpicker',
        'rangepicker',
    ];

    nodes: HTMLElement[];

    constructor(private eleRef: ElementRef) {}

    ngOnInit() {}

    scrollToView(index: number): void {
        const nodes = this.eleRef.nativeElement.querySelectorAll('.docs-example-viewer-wrapper');

        nodes[index].scrollIntoView(true);
    }
}
