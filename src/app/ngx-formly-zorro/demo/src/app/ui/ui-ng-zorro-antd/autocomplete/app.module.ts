import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';

import { AppComponent } from './app.component';
import { AutocompleteTypeComponent } from './autocomplete-type.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    FormlyModule.forRoot({
      types: [{
        name: 'autocomplete',
        component: AutocompleteTypeComponent,
        wrappers: ['form-field'],
      }],
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
    }),
  ],
  declarations: [
    AppComponent,
    AutocompleteTypeComponent,
  ],
})
export class AppModule { }
