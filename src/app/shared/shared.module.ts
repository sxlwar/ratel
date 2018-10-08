import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatCardModule,
    MatGridListModule,
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
    ],
})
export class SharedModule {}
