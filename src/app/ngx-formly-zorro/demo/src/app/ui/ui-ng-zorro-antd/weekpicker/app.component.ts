import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

import { DateHelperService, en_US, NZ_I18N, NzI18nService } from 'ng-zorro-antd';

import { DateHelper } from '../providers/date.service';

registerLocaleData(en);

@Component({
    selector: 'formly-app-example',
    templateUrl: './app.component.html',
    providers: [
        { provide: NZ_I18N, useValue: en_US },
        NzI18nService,
        { provide: DateHelperService, useClass: DateHelper },
    ],
})
export class AppComponent {
    form = new FormGroup({});
    model: any = {};
    options: FormlyFormOptions = {};
    fields: FormlyFieldConfig[] = [
        {
            key: 'WeekPicker',
            type: 'week-picker',
            templateOptions: {
                label: 'WeekPicker',
                placeholder: 'Placeholder',
                description: 'Description',
                required: true,
            },
        },
    ];
}
