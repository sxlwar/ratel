import { dateDebugFields, NzDebugConfig, NzPlaceHolderFieldConfig } from '../common';
import {
    NzFormatFieldConfig,
    NzRenderExtraFooterFieldConfig,
    NzDisabledTimeFieldConfig,
    NzShowTimeFieldConfig,
    NzShowTodayFieldConfig,
} from '../common/date';
import { AppComponent as RangePickerAppComponent } from './app.component';
import { AppModule as RangePickerAppModule } from './app.module';
import { FormlyFieldConfig } from '@ngx-formly/core';

const rangePicker = {
    title: 'RangePicker type',
    component: RangePickerAppComponent,
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

const NzRangesFieldConfig: FormlyFieldConfig = {
    key: 'nzRanges',
    type: 'input',
    className: 'col-md-4',
    templateOptions: {
        label: 'nzRanges',
        placeholder: 'Accept type { [key: string]: Date }',
    },
};

const RangesPickerExampleConfig: NzDebugConfig = {
    debugFields: [
        ...dateDebugFields,
        {
            key: 'templateOptions',
            fieldGroupClassName: 'row',
            fieldGroup: [
                NzDisabledTimeFieldConfig,
                NzFormatFieldConfig,
                NzRangesFieldConfig,
                NzRenderExtraFooterFieldConfig,
                NzShowTimeFieldConfig,
                NzShowTodayFieldConfig,
                NzPlaceHolderFieldConfig,
            ],
        },
    ],
    exampleConfig: rangePicker,
};

export { RangePickerAppModule, RangePickerAppComponent, RangesPickerExampleConfig };
