import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../providers/auth.service';

@Component({
    selector: 'ratel-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    constructor(
        private _authService: AuthService,
        private location: Location,
        private _router: Router,
    ) {}

    ngOnInit() {}

    login(method?: string): void {
        const redirectUrl = this._router.url;

        this._authService.getGithubAddress(redirectUrl).subscribe(domain => {
            // location.href = domain;
            this.location.go(domain);
        });
    }
}
