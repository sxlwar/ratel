import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
    {path: '', component: LayoutComponent, children: [
        {path: '', loadChildren: '../ngx-formly-zorro/demo/src/app/ui/ui-ng-zorro-antd/config.module#ConfigModule' }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormlyZorroRoutingModule { }
