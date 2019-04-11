import { dateDebugFields, NzDebugConfig, NzPlaceHolderFieldConfig } from '../common';
import { NzFormatFieldConfig, NzRenderExtraFooterFieldConfig } from '../common/date';
import { AppComponent as MonthPickerAppComponent } from './app.component';
import { AppModule as MonthPickerAppModule } from './app.module';

const monthPicker = {
    title: 'MonthPicker type',
    component: MonthPickerAppComponent,
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

const MonthPickerExampleConfig: NzDebugConfig = {
    debugFields: [
        ...dateDebugFields,
        {
            key: 'templateOptions',
            fieldGroupClassName: 'row',
            fieldGroup: [
                NzFormatFieldConfig,
                NzRenderExtraFooterFieldConfig,
                NzPlaceHolderFieldConfig,
            ],
        },
    ],
    exampleConfig: monthPicker,
};

export { MonthPickerAppModule, MonthPickerAppComponent, MonthPickerExampleConfig };

