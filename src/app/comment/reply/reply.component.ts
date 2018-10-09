import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, ElementRef, Input, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { take } from 'rxjs/operators';
import { LoginComponent } from 'src/app/auth/login/login.component';

@Component({
    selector: 'ratel-reply',
    templateUrl: './reply.component.html',
    styleUrls: ['./reply.component.scss'],
})
export class ReplyComponent implements OnInit, OnDestroy {
    @Input()
    buttonText: string;

    @ViewChild('autosize')
    autosize: CdkTextareaAutosize;

    @ViewChild('area')
    textarea: ElementRef;

    content: string;

    contentCtrl: FormControl = new FormControl();

    allowComment = false;

    isAlive = true;

    @Input()
    isComment = false;

    @Input()
    set placeholder(input: string) {
        if (input !== null && input !== undefined) {
            this._placeholder = input;
            this.contentEditable = false;
            this.allowComment = true;
        }
    }

    private _placeholder = '输入评论内容';

    get placeholder(): string {
        return this._placeholder;
    }

    contentEditable = true;

    constructor(private _zone: NgZone, private dialog: MatDialog) {}

    ngOnInit() {}

    onFocus() {
        // todo 检查用户是否已经登录 登录-->显示用户名 未登录-->显示登录弹窗
        // TODO 修改placeholder 为用户名

        this.placeholder = 'sxlwar';

        this.allowComment = true;
        setTimeout(() => {
            this.textarea.nativeElement.focus();
            this._zone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent());
        }, 0);
    }

    closeReply(): void {
        this.allowComment = false;
        this.contentEditable = true;
    }

    onFileOver(event: any): void {
        console.log(event);
    }

    submitComment(): void {
        console.log('submit comment');
    }

    switchToTextImageModel(): void {
        this.dialog.open(LoginComponent, { width: '500px' });
    }

    ngOnDestroy() {
        this.isAlive = false;
    }
}
