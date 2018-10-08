import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { ArticleModule } from './article/article.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        AppRoutingModule,
        ArticleModule,
        AuthModule,
        BrowserAnimationsModule,
        BrowserModule,
        HomeModule,
        HttpClientModule,
        SharedModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
