import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { BookMarkComponent } from './book-mark/book-mark.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule, SharedModule, RouterModule],
    declarations: [LoginComponent, BookMarkComponent],
    entryComponents: [LoginComponent],
    exports: [LoginComponent],
})
export class AuthModule {}
