import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { PersonalComponent } from './personal/personal.component';
import { BookMarkComponent } from './book-mark/book-mark.component';
import { ArticleManageComponent } from './article-manage/article-manage.component';

const routes: Route[] = [
    {
        path: '',
        component: PersonalComponent,
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
