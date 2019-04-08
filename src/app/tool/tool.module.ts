import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FourZeroFourComponent } from './four-zero-four/four-zero-four.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { TagComponent } from './tag/tag.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatDialogModule, MatButtonModule, MatMenuModule, MatIconModule, MatSidenavModule, MatListModule } from '@angular/material';
import { AppShellNoRenderDirective, AppShellRenderDirective } from './directive/app.shell.directive';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatDialogModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
    ],
    declarations: [
        FourZeroFourComponent,
        NavMenuComponent,
        TagComponent,
        ConfirmComponent,
        AppShellNoRenderDirective,
        AppShellRenderDirective,
        SideNavComponent,
    ],
    exports: [
        FourZeroFourComponent,
        NavMenuComponent,
        TagComponent,
        ConfirmComponent,
        AppShellNoRenderDirective,
        AppShellRenderDirective,
        SideNavComponent,
    ],
    entryComponents: [ConfirmComponent],
})
export class ToolModule {}
