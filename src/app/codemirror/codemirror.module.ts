import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatIconModule, MatButtonModule, MatTooltipModule } from '@angular/material';
import { CodemirrorComponent } from './codemirror/codemirror.component';
import { EditorComponent } from './editor/editor.component';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        FileUploadModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        FormsModule,
        FlexLayoutModule,
    ],
    declarations: [CodemirrorComponent, EditorComponent],
    exports: [EditorComponent],
})
export class CodemirrorModule {}
