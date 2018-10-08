import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FourZeroFourComponent } from './four-zero-four/four-zero-four.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

@NgModule({
    imports: [CommonModule],
    declarations: [FourZeroFourComponent, NavMenuComponent],
    exports: [FourZeroFourComponent, NavMenuComponent],
})
export class ToolModule {}
