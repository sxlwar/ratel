import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AuthService } from '../providers/auth.service';

@Component({
    selector: 'ratel-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    constructor(private _dialogRef: MatDialogRef<LoginComponent>, private _authService: AuthService) {}

    ngOnInit() {}

    close(method?: string): void {
        if (method) {
            this._authService.launchLogin(method);
        }
        this._dialogRef.close(method);
    }
}
