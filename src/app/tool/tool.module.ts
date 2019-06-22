import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatSidenavModule
} from '@angular/material';
import { RouterModule } from '@angular/router';

import { ConfirmComponent } from './confirm/confirm.component';
import { AppShellNoRenderDirective, AppShellRenderDirective } from './directive/app.shell.directive';
import { FourZeroFourComponent } from './four-zero-four/four-zero-four.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ProgressComponent } from './progress/progress.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { TagComponent } from './tag/tag.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatSidenavModule,
        RouterModule,
    ],
    declarations: [
        AppShellNoRenderDirective,
        AppShellRenderDirective,
        ConfirmComponent,
        FourZeroFourComponent,
        NavMenuComponent,
        ProgressComponent,
        SideNavComponent,
        SubscribeComponent,
        TagComponent,
    ],
    exports: [
        AppShellNoRenderDirective,
        AppShellRenderDirective,
        ConfirmComponent,
        FourZeroFourComponent,
        NavMenuComponent,
        ProgressComponent,
        SideNavComponent,
        SubscribeComponent,
        TagComponent,
    ],
    entryComponents: [ConfirmComponent],
})
export class ToolModule {}
