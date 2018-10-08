import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { BaseService } from '../../providers/base.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService extends BaseService {
    readonly path = 'auth';

    constructor(private _http: HttpClient) {
        super();
    }

    launchLogin(method: string): void {
        this._http
            .get(this.completeApiUrl(this.path, method), {
                headers: {
                    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                },
            })
            .subscribe(v => console.log(v));
    }

    getUserName(): Observable<string> {
        return of('未登录');
    }
}
