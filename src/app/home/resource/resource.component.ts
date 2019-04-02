import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

interface EduResource {
    image: string;
    name: string;
    url: string;
}

@Component({
    selector: 'ratel-resource',
    templateUrl: './resource.component.html',
    styleUrls: ['./resource.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceComponent implements OnInit {
    resource: EduResource[] = [
        { name: 'Angular', image: 'angular', url: 'https://angular.io' },
        { name: 'TypeScript', image: 'typescript', url: 'http://www.typescriptlang.org' },
        { name: 'Rxjs', image: 'rxjs', url: 'https://rxjs-dev.firebaseapp.com' },
        { name: 'Ionic', image: 'ionic', url: 'https://ionicframework.com' },
        { name: 'Ngrx', image: 'ngrx', url: 'https://github.com/ngrx/platform' },
        { name: 'Ngx formly', image: 'ngx_formly', url: 'https://github.com/formly-js/ngx-formly' },
        { name: 'Ngx Markdown', image: 'ngx_markdown', url: 'https://github.com/jfcere/ngx-markdown' },
        { name: 'Angular Flex Layout', image: 'ng_flex', url: 'https://github.com/angular/flex-layout' },
        { name: 'Lodash', image: 'lodash', url: 'https://lodash.com/docs/4.17.4' },
        { name: 'Angular material', image: 'angular_material', url: 'https://material.angular.io' },
        { name: 'Ng zorro antd', image: 'ng_zorro', url: 'https://ng.ant.design/docs/introduce/zh' },
        { name: 'Ng Bootstrap', image: 'ng_bootstrap', url: 'https://ng-bootstrap.github.io' },
        { name: 'Compodoc', image: 'compodoc', url: 'https://compodoc.app' },
        { name: 'Sass', image: 'sass', url: 'https://sass-lang.com' },
        { name: 'Less', image: 'less', url: 'http://lesscss.org' },
        { name: 'StackBlitz', image: 'stackbiliz', url: 'https://stackblitz.com' },
        { name: 'Jsbin', image: 'jsbin', url: 'https://jsbin.com' },
        { name: 'VS Code', image: 'vscode', url: 'https://code.visualstudio.com' },
        { name: 'Prettier', image: 'prettier', url: 'https://prettier.io' },
        { name: 'Nestjs', image: 'nestjs', url: 'https://docs.nestjs.com' },
    ];

    constructor() {}

    ngOnInit() {}

    getResource(resource: EduResource): void {
        window.open(resource.url);
    }
}
