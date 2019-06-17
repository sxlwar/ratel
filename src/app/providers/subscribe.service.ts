import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { catchError } from 'rxjs/operators';

import { SubscribeResponse } from '../interface/response.interface';
import { BaseService } from './base.service';
import { ErrorService } from './error.service';

@Injectable({
    providedIn: 'root',
})
export class SubscribeService extends BaseService {
    private readonly path = 'subscription';

    constructor(private _http: HttpClient, private _snack: MatSnackBar, private _error: ErrorService) {
        super();
    }

    subscribe(email: string): void {
        this._http
            .post<SubscribeResponse>(this.completeApiUrl(this.path), { email })
            .pipe(catchError(res => this._error.handleHttpError(res)))
            .subscribe(({ id }) => {
                this._snack.open(`订阅成功, 您是第${id}位订阅者.`, '', this.getSnackbarConfig('success'));
            });
    }
}
