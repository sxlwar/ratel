import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FourZeroFourComponent } from './four-zero-four/four-zero-four.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { TagComponent } from './tag/tag.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';

@NgModule({
    imports: [CommonModule, MatDialogModule, MatButtonModule],
    declarations: [FourZeroFourComponent, NavMenuComponent, TagComponent, ConfirmComponent],
    exports: [FourZeroFourComponent, NavMenuComponent, TagComponent, ConfirmComponent],
    entryComponents: [ConfirmComponent],
})
export class ToolModule {}
