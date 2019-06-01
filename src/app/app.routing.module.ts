import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { ArticleComponent } from './article/article/article.component';
import { HomeComponent } from './home/home/home.component';
import { FourZeroFourComponent } from './tool/four-zero-four/four-zero-four.component';
import { ReplyFullComponent } from './comment/reply-full/reply-full.component';
import { ArticleCreationComponent } from './article/article-creation/article-creation.component';
import { ArticleCreateGuard } from './providers/guard.service';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'home/:id', component: ArticleComponent, runGuardsAndResolvers: 'paramsChange' },
    { path: 'topic', loadChildren: () => import('./topic/topic.module').then(mod => mod.TopicModule) },
    { path: 'ngx-formly-zorro', loadChildren: () => import('./formly-zorro/formly-zorro.module').then(mod => mod.FormlyZorroModule) },
    { path: 'home/:id/reply', component: ReplyFullComponent },
    { path: 'create', component: ArticleCreationComponent, canDeactivate: [ArticleCreateGuard] },
    { path: 'personal', loadChildren: () => import('./personal/personal.module').then(mod => mod.PersonalModule) },
    { path: ':id', redirectTo: 'home/:id', pathMatch: 'full' }, // for search functionality
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: FourZeroFourComponent },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(appRoutes, {
            preloadingStrategy: PreloadAllModules,
            onSameUrlNavigation: 'reload',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
