import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EditorComponent } from '../../codemirror/editor/editor.component';
import { ArticleCategory } from '../../constant/constant';
import { ArticleService } from '../providers/article.service';
import { DeactivateGuard } from '../../interface/app.interface';
import { of } from 'rxjs';
import { User } from '../../auth/interface/auth.interface';
import { AuthService } from '../../providers/auth.service';
import { filter, takeWhile } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/interface/response.interface';

@Component({
    selector: 'ratel-article-creation',
    templateUrl: './article-creation.component.html',
    styleUrls: ['./article-creation.component.scss'],
})
export class ArticleCreationComponent implements OnInit, OnDestroy {
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

    user: User;

    isAlive = true;

    isUpdate = false;

    article: Article;

    constructor(
        private _fb: FormBuilder,
        private _articleService: ArticleService,
        private _authService: AuthService,
        private _route: ActivatedRoute,
    ) {
        this.initForm();
    }

    ngOnInit() {
        this._authService.userObs
            .pipe(
                filter(item => !!item),
                takeWhile(() => this.isAlive),
            )
            .subscribe(user => (this.user = user));

        this.checkUpdate();
    }

    private checkUpdate(): void {
        const params = this._route.snapshot.params;

        if (params.id) {
            this.isUpdate = true;

            this._articleService.getArticle(of(params.id)).subscribe(article => {
                const { author, title, subtitle, category, isOriginal, content, userId } = article;

                this.article = article;

                this.titleCtrl.patchValue(title);
                this.subtitleCtrl.patchValue(subtitle);
                this.authorCtrl.patchValue(author);
                this.isOriginalCtrl.patchValue(isOriginal);
                this.form.disable();
                this.categories.forEach(item => (item.selected = category.includes(item.category)));
                this.updateCategories();
                this.editor.data = content;
            });
        }
    }

    publish(isPublished: boolean): void {
        const response = this._articleService.createArticle({
            ...this.form.value,
            isPublished,
            content: this.getContent(),
            userId: this.user.id,
        });

        this._articleService.handleOperateArticleResponse(response);
    }

    private getContent(): string {
        return !!this.isOriginalCtrl.value
            ? this.editor.data + '\n\r' + '转载请注明出处：www.hijavascript.com'
            : this.editor.data;
    }

    update(): void {
        this._articleService.handleOperateArticleResponse(
            this._articleService.updateArticle({ id: this.article.id, content: this.editor.data }),
            '更新成功',
        );
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

    canDeactivate(): DeactivateGuard[] {
        return [{ canDeactivate: of(false), message: '确定离开此页面吗？', title: '放弃编辑' }];
    }

    ngOnDestroy() {
        this.isAlive = false;
    }
}
