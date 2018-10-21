import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable, throwError } from 'rxjs';

import { BaseService } from './base.service';

@Injectable()
export class ErrorService extends BaseService {
    constructor(private _snack: MatSnackBar) {
        super();
    }

    handleHttpError = (error: any): Observable<any> => {
        const exception = error.error;

        if (exception instanceof ErrorEvent) {
            console.error(exception.message);
        } else {
            this._snack.open(exception.message, '', this.snakeBarConfig);
        }

        return throwError('Something bad happened. Please try again later.');
    };
}
