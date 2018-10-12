import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EditorComponent } from '../../codemirror/editor/editor.component';
import { ArticleCategory } from '../../constant/constant';
import { ArticleService } from '../providers/article.service';

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

    categoryTouched = false;

    constructor(private _fb: FormBuilder, private _articleService: ArticleService) {
        this.initForm();
    }

    ngOnInit() {}

    publish(isPublished: boolean): void {
        const response = this._articleService.createArticle({
            ...this.form.value,
            isPublished,
            content: this.editor.data,
        });

        this._articleService.handleCreateArticleResponse(response);
    }

    private initForm(): void {
        this.form = this._fb.group({
            author: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3)]],
            title: ['', [Validators.required, Validators.maxLength(100)]],
            subtitle: '',
            category: ['', Validators.required],
            isOriginal: true,
        });
    }

    get authorCtrl(): AbstractControl {
        return this.form.get('author');
    }

    authorError(): string {
        if (this.authorCtrl.getError('required')) {
            return '请输入作者名称';
        } else if (this.authorCtrl.getError('maxlength')) {
            const { actualLength, requiredLength } = this.authorCtrl.getError('maxlength');

            return `最大长度${requiredLength}，当前长度${actualLength}`;
        } else if (this.authorCtrl.getError('minlength')) {
            const { requiredLength } = this.authorCtrl.getError('minlength');

            return `名称长度最少要求${requiredLength}个字符`;
        }
    }

    get titleCtrl(): AbstractControl {
        return this.form.get('title');
    }

    titleError(): string {
        if (this.titleCtrl.getError('required')) {
            return '必须输入一个标题';
        } else if (this.titleCtrl.getError('maxlength')) {
            const { actualLength, requiredLength } = this.titleCtrl.getError('maxlength');

            return `最大长度${requiredLength}，当前长度${actualLength}`;
        }
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

    updateCategories(): void {
        const categories = this.categories.filter(item => item.selected).map(item => item.category);

        this.categoryCtrl.setValue(categories);

        if (!this.categoryTouched) {
            this.categoryTouched = true;
        }
    }

    get isOriginalCtrl(): AbstractControl {
        return this.form.get('isOriginal');
    }

    allowPublish(): boolean {
        return this.form.valid && this.editor.data.length > 300;
    }
}
