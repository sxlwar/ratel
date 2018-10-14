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
    MatSelectModule,
    MatFormFieldModule,
    MatChipsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSnackBarModule,
} from '@angular/material';

import { ToolModule } from '../tool/tool.module';

@NgModule({
    exports: [
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
        MatSelectModule,
        MatFormFieldModule,
        MatChipsModule,
        MatCheckboxModule,
        MatRadioModule,
        MatSnackBarModule,
    ],
})
export class SharedModule {}
