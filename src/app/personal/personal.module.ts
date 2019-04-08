import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BookMarkComponent } from './book-mark/book-mark.component';
import { PersonalRoutingModule } from './personal.routing.module';
import { ArticleManageComponent } from './article-manage/article-manage.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
    imports: [CommonModule, PersonalRoutingModule, RouterModule, SharedModule],
    declarations: [BookMarkComponent, ArticleManageComponent, LayoutComponent],
})
export class PersonalModule {}
