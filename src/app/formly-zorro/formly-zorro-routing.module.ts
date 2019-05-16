import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
    {path: '', component: LayoutComponent, children: [
        /**
         * TODO: 由于ng-zorro-antd目前不支持服务器渲染，因此在打包服务端渲染代码之前需要将下面这行注释掉。也就是NGX_FORMLY_ZORRO页面下的功能当前是无法在服务端渲染的
         */
        {path: '', loadChildren: '../ngx-formly-zorro/demo/src/app/ui/ui-ng-zorro-antd/config.module#ConfigModule' }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormlyZorroRoutingModule { }
