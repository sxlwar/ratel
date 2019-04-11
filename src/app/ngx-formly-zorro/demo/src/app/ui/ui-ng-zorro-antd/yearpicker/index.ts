import { dateDebugFields, NzDebugConfig, NzPlaceHolderFieldConfig } from '../common';
import { NzFormatFieldConfig, NzRenderExtraFooterFieldConfig } from '../common/date';
import { AppComponent as YearPickerAppComponent } from './app.component';
import { AppModule as YearPickerAppModule } from './app.module';

const yearPicker = {
    title: 'YearPicker type',
    component: YearPickerAppComponent,
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

const YearPickerExampleConfig: NzDebugConfig = {
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
    exampleConfig: yearPicker,
};

export { YearPickerAppModule, YearPickerAppComponent, YearPickerExampleConfig };

