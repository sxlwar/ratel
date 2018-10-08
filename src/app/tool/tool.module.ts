import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FourZeroFourComponent } from './four-zero-four/four-zero-four.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { TagComponent } from './tag/tag.component';

@NgModule({
    imports: [CommonModule],
    declarations: [FourZeroFourComponent, NavMenuComponent, TagComponent],
    exports: [FourZeroFourComponent, NavMenuComponent, TagComponent],
})
export class ToolModule {}
