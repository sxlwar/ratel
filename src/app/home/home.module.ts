import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { AuthModule } from '../auth/auth.module';
import { ArticleModule } from '../article/article.module';
import { IntroComponent } from './intro/intro.component';
import { ResourceComponent } from './resource/resource.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule, SharedModule, AuthModule, ArticleModule, RouterModule],
    declarations: [HomeComponent, NavComponent, IntroComponent, ResourceComponent],
    exports: [NavComponent, HomeComponent],
})
export class HomeModule {}
