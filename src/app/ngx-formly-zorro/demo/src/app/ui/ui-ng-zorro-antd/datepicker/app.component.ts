import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { Component, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

import { DateHelperService, en_US, NZ_I18N, NzI18nService } from 'ng-zorro-antd';
import * as fnsFormat from 'date-fns/format';
import * as fnsGetISOWeek from 'date-fns/get_iso_week';

registerLocaleData(en);

@Injectable()
export class DateHelper extends DateHelperService {
    getISOWeek(date: Date) {
        return fnsGetISOWeek(date);
    }

    getFirstDayOfWeek() {
        return this.config.firstDayOfWeek == null ? 1 : this.config.firstDayOfWeek;
    }

    format(date: Date, formatStr: string) {
        return fnsFormat(date, formatStr, { locale: this.i18n.getDateLocale() });
    }
}

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
            key: 'DatePicker',
            type: 'date-picker',
            templateOptions: {
                label: 'DatePicker',
                placeholder: 'Placeholder',
                description: 'Description',
                required: true,
            },
        },
    ];
}
