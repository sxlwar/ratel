import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { ArticleModule } from './article/article.module';
import { markedOptionsFactory } from './constant/markdown';
import { HomeModule } from './home/home.module';
import { EmojiService } from './providers/emoji.service';
import { SharedModule } from './shared/shared.module';
import { TransferComponent } from './transfer/transfer.component';

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
})
export class AppModule {}
