import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home/home.component';
import { FourZeroFourComponent } from './tool/four-zero-four/four-zero-four.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'article', loadChildren: './article/article.module#ArticleModule', data: { preload: true } },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: FourZeroFourComponent },
];

@NgModule({
    imports: [CommonModule, RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
