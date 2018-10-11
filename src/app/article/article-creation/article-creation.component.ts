import { Component, OnInit, ViewChild } from '@angular/core';
import { EditorComponent } from '../../codemirror/editor/editor.component';
import { FormControl, FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ArticleCategory } from '../../constant/constant';

interface ArticleCreateForm {
    author: string;
    title: string;
    subtitle?: string;
    content: string;
    category: string[];
    isOriginal: boolean;
}

@Component({
    selector: 'ratel-article-creation',
    templateUrl: './article-creation.component.html',
    styleUrls: ['./article-creation.component.scss'],
})
export class ArticleCreationComponent implements OnInit {
    form: FormGroup;

    categories: { category: string; selected: boolean }[] = [
        { category: ArticleCategory.angular, selected: false },
        { category: ArticleCategory.rxjs, selected: false },
        { category: ArticleCategory.typescript, selected: false },
        { category: ArticleCategory.javascript, selected: false },
        { category: ArticleCategory.other, selected: false },
    ];

    showPreview = true;

    @ViewChild(EditorComponent)
    editor: EditorComponent;

    constructor(private _fb: FormBuilder) {
        this.initForm();
    }

    ngOnInit() {}

    private initForm(): void {
        this.form = this._fb.group({
            author: ['', Validators.required, Validators.maxLength(20), Validators.minLength(5)],
            title: ['', Validators.required, Validators.maxLength(100)],
            subtitle: '',
            content: ['', [Validators.required, Validators.minLength(300)]],
            category: ['', Validators.required],
            isOriginal: true,
        });
    }

    get authorCtrl(): AbstractControl {
        return this.form.get('author');
    }

    get titleCtrl(): AbstractControl {
        return this.form.get('title');
    }

    get subtitleCtrl(): AbstractControl {
        return this.form.get('subtitle');
    }

    get contentCtrl(): AbstractControl {
        return this.form.get('content');
    }

    get isPublishedCtrl(): AbstractControl {
        return this.form.get('isPublished');
    }

    get categoryCtrl(): AbstractControl {
        return this.form.get('category');
    }

    get isOriginalCtrl(): AbstractControl {
        return this.form.get('isOriginal');
    }
}
