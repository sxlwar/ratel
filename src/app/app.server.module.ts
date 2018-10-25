import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { UniversalInterceptorService } from './providers/universal-interceptor.service';

@NgModule({
    imports: [AppModule, ServerModule, ModuleMapLoaderModule, ServerTransferStateModule, FlexLayoutServerModule],
    bootstrap: [AppComponent],
    // providers: [
    //     {provide: HTTP_INTERCEPTORS, useClass: UniversalInterceptorService, multi: true}
    // ]
})
export class AppServerModule {}
