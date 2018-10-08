import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { ArticleComponent } from './article/article/article.component';
import { HomeComponent } from './home/home/home.component';
import { FourZeroFourComponent } from './tool/four-zero-four/four-zero-four.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'home/:id', component: ArticleComponent },
    { path: 'topic', loadChildren: './topic/topic.module#TopicModule' },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: FourZeroFourComponent },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(appRoutes, {
            preloadingStrategy: PreloadAllModules,
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
