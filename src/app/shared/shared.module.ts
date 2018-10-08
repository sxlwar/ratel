import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatTooltipModule,
} from '@angular/material';

import { ToolModule } from '../tool/tool.module';

@NgModule({
    exports: [
        CommonModule,
        ToolModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatMenuModule,
        MatDialogModule,
        MatCardModule,
        MatGridListModule,
        MatTooltipModule,
    ],
})
export class SharedModule {}
