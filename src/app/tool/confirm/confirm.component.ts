import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'ratel-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
    title = '操作确认';

    message: string;

    constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }) {}

    ngOnInit() {
        this.message = this.data.message;

        if (this.data.title) {
            this.title = this.data.title;
        }
    }
}
