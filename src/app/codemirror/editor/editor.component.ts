import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { FileUploader } from 'ng2-file-upload';

import { UploadService } from '../../providers/upload.service';
import { CodemirrorComponent } from '../codemirror/codemirror.component';
import { ALLOW_UPLOAD_FILE_TYPES } from '../../constant/constant';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ratel-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
    @Input() public tip = '';
    @ViewChild(CodemirrorComponent) private CodeMirror: CodemirrorComponent;
    @Output() public change: EventEmitter<string> = new EventEmitter();
    @Output() public preview: EventEmitter<boolean> = new EventEmitter();
    /** 是否显示 `返回普通编辑器` icon */
    public needShow: boolean;
    public data = '';
    public uploader = new FileUploader({ url: 'localhost:3000' });
    public codeMirrorOptions = {
        theme: 'eclipse',
        mode: 'markdown',
        indentUnit: 4,
        lineNumber: true,
        styleActiveLine: true,
        autoFocus: true,
        dragDrop: true,
        allowDropFileTypes: ALLOW_UPLOAD_FILE_TYPES,
    };
    public fileDropOver = false;


    public constructor(
        private _upload: UploadService,
        private locationServ: Location,
        public router: ActivatedRoute,
    ) { }

    /**
     *@function back to prev route
     *
     */
    public back(): void {
        this.locationServ.back();
    }


    public onFileDropOver(isOver: boolean): void {
        if (this.fileDropOver !== isOver) {
            this.fileDropOver = isOver;
        }
    }

    public fileSelected(list: FileList): void {
        this._upload.uploadImage(list).subscribe(images => {
            const url = images.map(image => `![${image.name}](${image.url})`).join('\n\r');
            const doc = this.CodeMirror.codeMirror.getDoc();
            const cursor = doc.getCursor();
            const line = doc.getLine(cursor.line);
            const pos = {
                line: cursor.line,
                ch: line.length + 1,
            };

            doc.replaceRange('\n' + url + '\n', pos);
        });
    }
    public ngOnInit() {
        this.router.params.subscribe(para => this.needShow = !!para.id);
    }
}
