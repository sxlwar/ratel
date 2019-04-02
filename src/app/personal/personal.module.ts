import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BookMarkComponent } from './book-mark/book-mark.component';
import { PersonalRoutingModule } from './personal.routing.module';
import { PersonalComponent } from './personal/personal.component';
import { ArticleManageComponent } from './article-manage/article-manage.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatSidenavModule, MatListModule } from '@angular/material';

@NgModule({
    imports: [CommonModule, PersonalRoutingModule, RouterModule, SharedModule, MatSidenavModule, MatListModule],
    declarations: [BookMarkComponent, PersonalComponent, ArticleManageComponent],
})
export class PersonalModule {}
