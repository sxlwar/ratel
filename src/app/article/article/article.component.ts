import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ratel-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
    data =
        // tslint:disable-next-line:max-line-length
        '# 测试文字\n\r## 测试二级标题\n\r### 测试三级标题\n\r#### 测试四级标题\n\r >块引用\n\r**斜体内容**\n\r```javascript\n\rfunction() { console.log(name)}\n\r```\n\r ![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1") \n\r';

    constructor() {}

    ngOnInit() {}

    addLike(): void {
        console.log('update enjoy');
    }
}
