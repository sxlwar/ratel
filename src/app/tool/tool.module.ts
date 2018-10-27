import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FourZeroFourComponent } from './four-zero-four/four-zero-four.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { TagComponent } from './tag/tag.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatDialogModule, MatButtonModule, MatMenuModule, MatIconModule } from '@angular/material';
import { AppShellNoRenderDirective, AppShellRenderDirective } from './directive/app.shell.directive';

@NgModule({
    imports: [CommonModule, MatDialogModule, MatButtonModule, MatMenuModule, MatIconModule],
    declarations: [
        FourZeroFourComponent,
        NavMenuComponent,
        TagComponent,
        ConfirmComponent,
        AppShellNoRenderDirective,
        AppShellRenderDirective,
    ],
    exports: [
        FourZeroFourComponent,
        NavMenuComponent,
        TagComponent,
        ConfirmComponent,
        AppShellNoRenderDirective,
        AppShellRenderDirective,
    ],
    entryComponents: [ConfirmComponent],
})
export class ToolModule {}
