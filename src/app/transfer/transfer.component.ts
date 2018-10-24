import { isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';

const RESULT_KEY = makeStateKey<string>('post_state');

@Component({
    selector: 'ratel-transfer',
    templateUrl: './transfer.component.html',
    styleUrls: ['./transfer.component.scss'],
})
export class TransferComponent implements OnInit {
    isServer = isPlatformServer(this._platformId);

    result: string;

    constructor(private _transferState: TransferState, @Inject(PLATFORM_ID) private _platformId: Object) {}

    ngOnInit() {
        if (this._transferState.hasKey(RESULT_KEY)) {
            // in browser
            this.result = this._transferState.get(RESULT_KEY, '');
        } else if (this.isServer) {
            this._transferState.set(RESULT_KEY, 'Create on server.');
        } else {
            // no result received;
            this.result = 'Create on browser';
        }
    }
}
