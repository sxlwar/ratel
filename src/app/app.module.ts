import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { ArticleModule } from './article/article.module';
import { HomeModule } from './home/home.module';
import { AuthService } from './providers/auth.service';
import { ErrorService } from './providers/error.service';
import { ArticleCreateGuard } from './providers/guard.service';
import { UploadService } from './providers/upload.service';
import { SharedModule } from './shared/shared.module';
import { TransferComponent } from './transfer/transfer.component';

@NgModule({
    declarations: [AppComponent, TransferComponent],
    imports: [
        AppRoutingModule,
        ArticleModule,
        BrowserAnimationsModule,
        BrowserModule.withServerTransition({ appId: 'static-app'}),
        BrowserTransferStateModule,
        HomeModule,
        HttpClientModule,
        SharedModule,
    ],
    bootstrap: [AppComponent],
    providers: [UploadService, ErrorService, ArticleCreateGuard, AuthService],
})
export class AppModule {}
