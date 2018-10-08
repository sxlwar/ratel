import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthService } from './providers/auth.service';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [LoginComponent],
    entryComponents: [LoginComponent],
    providers: [AuthService],
    exports: [LoginComponent],
})
export class AuthModule {}
