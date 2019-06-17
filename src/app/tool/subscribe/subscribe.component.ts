import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ratel-subscribe',
    templateUrl: './subscribe.component.html',
    styleUrls: ['./subscribe.component.scss'],
})
export class SubscribeComponent implements OnInit {
    email = '';

    @Output() subscribe: EventEmitter<string> = new EventEmitter();

    constructor() {}

    ngOnInit() {}

    onSubmit() {
        !!this.email && this.subscribe.emit(this.email);
    }
}
