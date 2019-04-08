import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormlyZorroRoutingModule } from './formly-zorro-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from '../shared/shared.module';
import { ToolModule } from '../tool/tool.module';

@NgModule({
    declarations: [LayoutComponent],
    imports: [CommonModule, FormlyZorroRoutingModule, SharedModule, ToolModule],
})
export class FormlyZorroModule {}
