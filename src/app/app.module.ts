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
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { EmojiService } from './providers/emoji.service';
import { markedOptionsFactory } from './constant/markdown';

@NgModule({
    declarations: [AppComponent, TransferComponent],
    imports: [
        AppRoutingModule,
        ArticleModule,
        BrowserAnimationsModule,
        BrowserModule.withServerTransition({ appId: 'static-app' }),
        BrowserTransferStateModule,
        HomeModule,
        HttpClientModule,
        SharedModule,
        MarkdownModule.forRoot({
            markedOptions: {
                provide: MarkedOptions,
                useFactory: markedOptionsFactory,
                deps: [EmojiService]
            }
        })
    ],
    bootstrap: [AppComponent],
    providers: [UploadService, ErrorService, ArticleCreateGuard, AuthService],
})
export class AppModule {}
