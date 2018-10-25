import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../providers/auth.service';

@Component({
    selector: 'ratel-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    constructor(private _authService: AuthService, private _router: Router) {}

    ngOnInit() {}

    login(method?: string): void {
        const path = this._router.url;

        this._authService.getGithubAddress(path).subscribe(domain => {
            location.href = domain;
        });
    }
}
