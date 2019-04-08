import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { BookMarkComponent } from './book-mark/book-mark.component';
import { ArticleManageComponent } from './article-manage/article-manage.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Route[] = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'bookmark', component: BookMarkComponent },
            { path: 'stored', component: ArticleManageComponent },
            { path: '', redirectTo: 'bookmark', pathMatch: 'full' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class PersonalRoutingModule {}
