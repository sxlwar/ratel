import { Component, OnDestroy, OnInit, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { BehaviorSubject, of, Observable, iif } from 'rxjs';
import { filter, takeWhile, tap, take, share, map, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { Article } from 'src/app/interface/response.interface';

import { User } from '../../auth/interface/auth.interface';
import { EditorComponent } from '../../codemirror/editor/editor.component';
import { ArticleCategory } from '../../constant/constant';
import { DeactivateGuard } from '../../interface/app.interface';
import { AuthService } from '../../providers/auth.service';
import { ArticleService } from '../providers/article.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UploadService, UploadResult } from 'src/app/providers/upload.service';
import { isPlatformBrowser } from '@angular/common';
import { trigger, transition, animate, state, style } from '@angular/animations';

@Component({
    selector: 'ratel-article-creation',
    templateUrl: './article-creation.component.html',
    styleUrls: ['./article-creation.component.scss'],
    animations: [
        trigger('toggleFull', [
            state('half', style({ 'min-width': '48%' })),
            state('full', style({ 'min-width': '100%' })),
            transition('half <=> full', [animate('500ms ease-out')]),
        ]),
        trigger('togglePreview', [transition('void <=> *', [animate('500ms ease-out')])]),
    ],
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

    @ViewChild(EditorComponent, { static: true })
    editor: EditorComponent;

    categoryTouched = false;

    user: User;

    isAlive = true;

    isUpdate = false;

    article: Article;

    /**
     * 给路由守卫提供跳转的依据
     */
    isPristine: BehaviorSubject<boolean> = new BehaviorSubject(true);

    imageChangedEvent: Event;

    isBrowser = isPlatformBrowser(this._platformId);

    constructor(
        private _fb: FormBuilder,
        private _articleService: ArticleService,
        private _authService: AuthService,
        private _route: ActivatedRoute,
        private _upload: UploadService,
        @Inject(PLATFORM_ID) private _platformId: Object,
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

        /**
         * FIXME: 文章发表完成之后，表单的值又重新被发出了一次，导致isPristine最后发出的值是 false，路由跳转时被否。
         * 先用distinctUntilChanged将就的处理一下。回头还是需要找出重复发出值的原因。
         */
        this.form.valueChanges
            .pipe(distinctUntilChanged((pre, cur) => JSON.stringify(pre) === JSON.stringify(cur)))
            .subscribe(_ => this.isPristine.next(false));

        this.isCustomThumbnail.valueChanges.subscribe(needThumbnail => {
            if (!this.form.disabled) {
                const validateFn = needThumbnail ? Validators.required : null;

                this.thumbnail.setValidators(validateFn);
                this.thumbnail.updateValueAndValidity();
            }
        });
    }

    private checkUpdate(): void {
        const params = this._route.snapshot.params;

        if (params.id) {
            this.isUpdate = true;

            this._articleService.getArticle(of(params.id)).subscribe(article => {
                const { author, title, subtitle, category, isOriginal, content, thumbnail } = article;

                this.article = article;

                this.titleCtrl.patchValue(title);
                this.subtitleCtrl.patchValue(subtitle);
                this.authorCtrl.patchValue(author);
                this.isOriginalCtrl.patchValue(isOriginal);
                this.isCustomThumbnail.patchValue(!!thumbnail);
                this.form.disable();
                this.categories.forEach(item => (item.selected = category.includes(item.category)));
                this.updateCategories();
                this.editor.data = content;
                this.editor.markAsPristine(true);
            });
        }
    }

    /**
     * 在提交表单之前检查用户是否使用自定义封面图片，确保传给后的 thumbnail 字段是一个url地址而不是图片。
     */
    publish(isPublished: boolean): void {
        const response = this.checkThumbnail().pipe(
            switchMap(({ url, name }) =>
                this._articleService.createArticle({
                    ...this.form.value,
                    thumbnail: url,
                    isPublished,
                    content: this.getContent(),
                    userId: this.user.id,
                }),
            ),
            share(),
        );

        this._articleService.handleOperateArticleResponse(response);

        /**
         * 切换到更新状态
         */
        response.subscribe(id => {
            this.modifyPristineState(!!id);

            if (!!id) {
                this.isUpdate = true;
                this.article = { ...this.form.value, id } as Article;
                this.form.disable();
            }
        });
    }

    update(isPublish?: boolean): void {
        const params = { id: this.article.id, content: this.editor.data };
        const response = this._articleService
            .updateArticle(isPublish ? { ...params, isPublish } : params)
            .pipe(tap(({ isUpdated }) => this.modifyPristineState(isUpdated)));

        this._articleService.handleOperateArticleResponse(response, '更新成功');
    }

    private checkThumbnail(): Observable<UploadResult> {
        const createFile = (): FileList => {
            const file = this._upload.base64ToFile(this.thumbnail.value, this.titleCtrl.value);

            return {
                0: file,
                length: 1,
                item() {
                    return file;
                },
            } as FileList;
        };

        return iif(
            () => this.isCustomThumbnail.value,
            this._upload.uploadImage(createFile()).pipe(map(([result]) => result)),
            of({ url: '', name: '' }),
        );
    }

    private getContent(): string {
        return !!this.isOriginalCtrl.value
            ? this.editor.data + '\n\r' + '转载请注明出处：www.hijavascript.com'
            : this.editor.data;
    }

    /**
     * 需要同时重置此组件的表单及editor组件的状态
     */
    private modifyPristineState(isPristine: boolean) {
        this.isPristine.next(isPristine);
        this.editor.markAsPristine(isPristine);
    }

    private initForm(): void {
        this.form = this._fb.group({
            author: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3)]],
            title: ['', [Validators.required, Validators.maxLength(100)]],
            subtitle: '',
            category: ['', Validators.required],
            isOriginal: true,
            isCustomThumbnail: false,
            thumbnail: '',
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

    get isCustomThumbnail(): AbstractControl {
        return this.form.get('isCustomThumbnail');
    }

    get thumbnail(): AbstractControl {
        return this.form.get('thumbnail');
    }

    allowPublish(): boolean {
        return this.form.valid && this.editor.data.length > 300;
    }

    canDeactivate(): DeactivateGuard[] {
        return [
            {
                canDeactivate: this.isPristine.asObservable().pipe(take(1)),
                message: '可能有未保存的内容，确定离开此页面吗？',
                title: '放弃编辑',
            },
        ];
    }

    fileChangeEvent(event: Event): void {
        this.imageChangedEvent = event;
    }

    imageCropped(event: ImageCroppedEvent) {
        this.thumbnail.patchValue(event.base64);
    }

    imageLoaded() {}

    loadImageFailed() {}

    ngOnDestroy() {
        this.isAlive = false;
    }
}
