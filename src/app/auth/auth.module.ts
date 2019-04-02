import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [LoginComponent],
    entryComponents: [LoginComponent],
    exports: [LoginComponent],
})
export class AuthModule {}
