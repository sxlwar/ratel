import { dateDebugFields, NzDebugConfig, NzPlaceHolderFieldConfig } from '../common';
import {
    NzDisabledTimeFieldConfig, NzFormatFieldConfig, NzRenderExtraFooterFieldConfig, NzShowTimeFieldConfig,
    NzShowTodayFieldConfig
} from '../common/date';
import { AppComponent as DatePickerAppComponent } from './app.component';
import { AppModule as DatePickerAppModule } from './app.module';

const datePicker = {
    title: 'DatePicker type',
    component: DatePickerAppComponent,
    debug: true,
    files: [
        {
            file: 'app.component.html',
            content: require('!!highlight-loader?raw=true&lang=html!./app.component.html'),
            filecontent: require('!!raw-loader!./app.component.html'),
        },
        {
            file: 'app.component.ts',
            content: require('!!highlight-loader?raw=true&lang=typescript!./app.component.ts'),
            filecontent: require('!!raw-loader!./app.component.ts'),
        },
        {
            file: 'app.module.ts',
            content: require('!!highlight-loader?raw=true&lang=typescript!./app.module.ts'),
            filecontent: require('!!raw-loader!./app.module.ts'),
        },
    ],
};

const DatePickerExampleConfig: NzDebugConfig = {
    debugFields: [
        ...dateDebugFields,
        {
            key: 'templateOptions',
            fieldGroupClassName: 'row',
            fieldGroup: [
                NzDisabledTimeFieldConfig,
                NzFormatFieldConfig,
                NzRenderExtraFooterFieldConfig,
                NzShowTimeFieldConfig,
                NzShowTodayFieldConfig,
                NzPlaceHolderFieldConfig,
            ],
        },
    ],
    exampleConfig: datePicker,
};

export { DatePickerAppModule, DatePickerAppComponent, DatePickerExampleConfig };

