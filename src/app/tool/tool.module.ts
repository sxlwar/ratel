import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FourZeroFourComponent } from './four-zero-four/four-zero-four.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { TagComponent } from './tag/tag.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatDialogModule, MatButtonModule, MatMenuModule, MatIconModule, MatSidenavModule, MatListModule, MatInputModule } from '@angular/material';
import { AppShellNoRenderDirective, AppShellRenderDirective } from './directive/app.shell.directive';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { FormsModule } from '@angular/forms';

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
        FourZeroFourComponent,
        NavMenuComponent,
        TagComponent,
        ConfirmComponent,
        AppShellNoRenderDirective,
        AppShellRenderDirective,
        SideNavComponent,
        SubscribeComponent,
    ],
    exports: [
        FourZeroFourComponent,
        NavMenuComponent,
        TagComponent,
        ConfirmComponent,
        AppShellNoRenderDirective,
        AppShellRenderDirective,
        SideNavComponent,
        SubscribeComponent,
    ],
    entryComponents: [ConfirmComponent],
})
export class ToolModule {}
