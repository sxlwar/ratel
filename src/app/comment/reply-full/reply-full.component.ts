import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EditorComponent } from '../../codemirror/editor/editor.component';
import { CommentService } from '../providers/comment.service';

@Component({
    selector: 'ratel-reply-full',
    templateUrl: './reply-full.component.html',
    styleUrls: ['./reply-full.component.scss'],
})
export class ReplyFullComponent implements OnInit {
    showPreview = false;

    @ViewChild(EditorComponent)
    editor: EditorComponent;

    constructor(private _route: ActivatedRoute, private _commentService: CommentService) {}

    ngOnInit() {}

    submit() {
        const articleId = +this._route.snapshot.paramMap.get('id');

        this._commentService.createComment({ content: this.editor.data, username: 'sxlwar', userId: 1, articleId });
    }
}
