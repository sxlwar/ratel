import { Component, OnInit, Output, EventEmitter, ViewChild  } from '@angular/core';
import { CodemirrorComponent } from '../codemirror/codemirror.component';

import { FileUploader } from 'ng2-file-upload';

@Component({
    selector: 'ratel-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
    data =
        'For test ckeditor purpose\n\r ```javascript\nfunction name() {}\n```\n\r > block \r\n\r\n1. n\n\r2. 3\n\r3. b\r\n----';

    uploader = new FileUploader({ url: 'localhost:3000' });

    @Output()
    change: EventEmitter<string> = new EventEmitter();

    codeMirrorOptions = {
        theme: 'eclipse',
        mode: 'markdown',
        indentUnit: 4,
        lineNumber: true,
        styleActiveLine: true,
        autoFocus: true,
        dragDrop: true,
        allowDropFileTypes: ['image/png', 'image/jpg', 'image/jpeg'],
    };

    @Output()
    preview: EventEmitter<boolean> = new EventEmitter();

    fileDropOver = false;

    @ViewChild(CodemirrorComponent)
    CodeMirror: CodemirrorComponent;

    constructor() {}

    ngOnInit() {}

    onFileDropOver(isOver: boolean): void {
        console.log(isOver);
        if (this.fileDropOver !== isOver) {
            this.fileDropOver = isOver;
        }
    }

    fileSelected(list: FileList): void {
        console.log(list);
        const position = this.CodeMirror.codeMirror.getDoc().getCursor();

        const fileReader = new FileReader();

        fileReader.onloadend = () => {
            // const imgEle = document.createElement('img');
            // imgEle.src = <string>fileReader.result;
            // const codeMirror = this.CodeMirror.codeMirror;
            // codeMirror.addLineWidget(position.line + 1, imgEle, {
            //     showIfHidden: false,
            //     above: true,
            //     coverGutter: false,
            //     noHScroll: false,
            // });
            // codeMirror.getDoc().setCursor({ line: position.line + 1, ch: null });
            // console.log(this.data);
        };

        fileReader.readAsDataURL(list[0]);
    }
}
