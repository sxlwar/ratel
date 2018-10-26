import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isPlatformBrowser } from '@angular/common';

import { Observable, throwError } from 'rxjs';

import { BaseService } from './base.service';

@Injectable()
export class ErrorService extends BaseService {
    private isBrowser = isPlatformBrowser(this.platformId);

    constructor(private _snack: MatSnackBar, @Inject(PLATFORM_ID) private platformId: Object) {
        super();
    }

    handleHttpError = (error: any): Observable<any> => {
        const exception = error.error;

        if (this.isBrowser) {
            if (exception instanceof ErrorEvent) {
                console.error(exception.message);
            } else {
                this._snack.open(exception.message, '', this.snakeBarConfig);
            }
        }

        return throwError(exception.message);
    };
}
