import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EditorComponent } from '../../codemirror/editor/editor.component';

@Component({
    selector: 'ratel-reply-full',
    templateUrl: './reply-full.component.html',
    styleUrls: ['./reply-full.component.scss'],
})
export class ReplyFullComponent implements OnInit {
    showPreview = false;

    @ViewChild(EditorComponent) editor: EditorComponent;

    constructor(private _route: ActivatedRoute) {}

    ngOnInit() {
        this._route.paramMap.subscribe(v => console.log(v));
    }
}
