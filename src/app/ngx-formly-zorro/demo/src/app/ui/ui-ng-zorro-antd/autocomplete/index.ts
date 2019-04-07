import { FormlyFieldConfig } from '@ngx-formly/core';

import { debugFields, NzDebugConfig } from '../common';
import { AppComponent as AutocompleteAppComponent } from './app.component';
import { AppModule as AutocompleteAppModule } from './app.module';

const autocomplete = {
  title: 'Autocomplete type',
  component: AutocompleteAppComponent,
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

    {
      file: 'autocomplete-type.component.ts',
      content: require('!!highlight-loader?raw=true&lang=typescript!./autocomplete-type.component.ts'),
      filecontent: require('!!raw-loader!./autocomplete-type.component.ts'),
    },
  ],
};

const NzBackFillFieldConfig: FormlyFieldConfig = {
  key: 'nzBackFill',
  type: 'checkbox',
  className: 'col-md-4',
  templateOptions: {
    label: 'nzBackFill',
  },
};

const NzDataSourceFieldConfig: FormlyFieldConfig = {
  key: 'nzDataSource',
  type: 'input',
  className: 'col-md-4',
  templateOptions: {
    label: 'nzDataSource',
  },
};

const NzDefaultActiveFirstOptionFieldConfig: FormlyFieldConfig = {
  key: 'nzDefaultActiveFirstOption',
  type: 'checkbox',
  className: 'col-md-4',
  defaultValue: true,
  templateOptions: {
    label: 'nzDefaultActiveFirstOption',
  },
};

const NzOverlayClassNameFieldConfig: FormlyFieldConfig = {
  key: 'nzOverlayClassName',
  type: 'input',
  className: 'col-md-4',
  templateOptions: {
    label: 'nzOverlayClassName',
  },
};

const NzOverlayStyleFieldConfig: FormlyFieldConfig = {
  key: 'nzOverlayStyle',
  type: 'input',
  className: 'col-md-4',
  templateOptions: {
    label: 'nzOverlayStyle',
    disabled: true,
    placeholder: 'Accept a style config object',
  },
};

export const NzWidthFieldConfig: FormlyFieldConfig = {
  key: 'nzWidth',
  type: 'input-number',
  className: 'col-md-4',
  templateOptions: {
    label: 'nzWidth',
  },
};

const AutocompleteExampleConfig: NzDebugConfig = {
  debugFields: [
    ...debugFields,
    {
      key: 'templateOptions',
      fieldGroupClassName: 'row',
      fieldGroup: [
        NzBackFillFieldConfig,
        NzDataSourceFieldConfig,
        NzDefaultActiveFirstOptionFieldConfig,
        NzOverlayClassNameFieldConfig,
        NzOverlayStyleFieldConfig,
        // NzWidthFieldConfig, // TODO: unavailable, me by a bug;
      ],
    },
  ],
  exampleConfig: autocomplete,
};

export { AutocompleteAppModule, AutocompleteAppComponent, AutocompleteExampleConfig };
