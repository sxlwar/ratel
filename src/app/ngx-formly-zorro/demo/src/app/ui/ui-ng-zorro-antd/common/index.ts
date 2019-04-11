import { FormlyFieldConfig } from '@ngx-formly/core';
import { debugFields as commonDebugFields } from '../../common';
import { NzClassNameFieldConfig, NzDateRenderFieldConfig, NzDisabledDateFieldConfig, NzPopupStyleFieldConfig } from './date';

export interface DebugFile {
  file: string;
  content: any;
  filecontent: any;
}

export interface ExampleConfig {
  title: string;
  component: any;
  debug: boolean;
  files: DebugFile[];
}
export interface NzDebugConfig {
  debugFields: FormlyFieldConfig[];
  exampleConfig: ExampleConfig;
}

const NzLabelSpanConfig: FormlyFieldConfig = {
  key: 'nzLabelSpan',
  type: 'input-number',
  className: 'col-md-6',
  templateOptions: {
    label: 'nzLabelSpan',
    nzMin: 0,
    nzMax: 24,
  },
};

const NzControlSpanConfig: FormlyFieldConfig = {
  key: 'nzControlSpan',
  type: 'input-number',
  className: 'col-md-6',
  templateOptions: {
    label: 'nzControlSpan',
    nzMin: 0,
    nzMax: 24,
  },
};

export const debugFields: FormlyFieldConfig[] = [
  ...commonDebugFields,
  { key: 'templateOptions', fieldGroupClassName: 'row', fieldGroup: [NzLabelSpanConfig, NzControlSpanConfig] },
];

export const NzSizeFieldConfig: FormlyFieldConfig = {
  key: 'nzSize',
  type: 'select',
  className: 'col-md-4',
  defaultValue: 'default',
  templateOptions: {
    label: 'nzSize',
    options: [
      { label: 'default', value: 'default' },
      { label: 'large', value: 'large' },
      { label: 'small', value: 'small' },
    ],
  },
};

export const NzAutoFocusFieldConfig: FormlyFieldConfig = {
  key: 'nzAutoFocus',
  type: 'checkbox',
  className: 'col-md-4',
  defaultValue: false,
  templateOptions: {
    label: 'nzAutoFocus',
  },
};

export const NzDisabledFieldConfig: FormlyFieldConfig = {
  key: 'nzDisabled',
  type: 'checkbox',
  className: 'col-md-4',
  templateOptions: {
    label: 'nzDisabled',
  },
};

export const NzValueFieldConfig: FormlyFieldConfig = {
  key: 'nzValue',
  type: 'input',
  className: 'col-md-4',
  templateOptions: {
    label: 'nzValue',
  },
};

export const NzNameFieldConfig: FormlyFieldConfig = {
  key: 'nzName',
  type: 'input',
  className: 'col-md-4',
  templateOptions: {
    label: 'nzName',
  },
};

export const NzPlaceHolderFieldConfig: FormlyFieldConfig = {
  key: 'nzPlaceHolder',
  type: 'input',
  className: 'col-md-4',
  templateOptions: {
    label: 'nzPlaceHolder',
  },
};

export const NzAllowClearFieldConfig: FormlyFieldConfig = {
  key: 'nzAllowClear',
  type: 'checkbox',
  className: 'col-md-4',
  defaultValue: true,
  templateOptions: {
    label: 'nzAllowClear',
  },
};

export const NzNotFoundContentFieldConfig: FormlyFieldConfig = {
  key: 'nzNotFoundContent',
  type: 'input',
  className: 'col-md-4',
  templateOptions: {
    label: 'nzNotFoundContent',
  },
};

export const NzShowArrowFieldConfig: FormlyFieldConfig = {
  key: 'nzShowArrow',
  type: 'checkbox',
  className: 'col-md-4',
  defaultValue: true,
  templateOptions: {
    label: 'nzShowArrow',
  },
};

export const NzShowSearchFieldConfig: FormlyFieldConfig = {
  key: 'nzShowSearch',
  type: 'checkbox',
  className: 'col-md-4',
  templateOptions: {
    label: 'nzShowSearch',
  },
};

export const NzShowInputFieldConfig: FormlyFieldConfig = {
  key: 'nzShowInput',
  type: 'checkbox',
  className: 'col-md-4',
  defaultValue: true,
  templateOptions: {
    label: 'nzShowInput',
  },
};

export const NzLabelFieldConfig: FormlyFieldConfig = {
  key: 'nzLabel',
  type: 'input',
  className: 'col-md-4',
  templateOptions: {
    label: 'nzLabel',
  },
};

export const NzLocaleFieldConfig: FormlyFieldConfig = {
  key: 'nzLocale',
  type: 'input',
  className: 'col-md-4',
  templateOptions: {
    label: 'nzLocale',
  },
};

export const NzOpenFieldConfig: FormlyFieldConfig = {
  key: 'nzOpen',
  type: 'checkbox',
  className: 'col-md-4',
  templateOptions: {
    label: 'nzOpen',
  },
};

export const NzDropdownClassNameFieldConfig: FormlyFieldConfig = {
  key: 'nzDropdownClassName',
  type: 'input',
  className: 'col-md-4',
  templateOptions: {
    label: 'nzDropdownClassName',
  },
};

export const NzStyleFieldConfig: FormlyFieldConfig = {
    key: 'nzStyle',
    type: 'input',
    className: 'col-md-4',
    templateOptions: {
        label: 'nzStyle'
    }
};

export const dateDebugFields: FormlyFieldConfig[] = [
    ...debugFields,
  {key: 'templateOptions', fieldGroupClassName: 'row', fieldGroup: [
    NzAllowClearFieldConfig,
    NzAutoFocusFieldConfig,
    NzClassNameFieldConfig,
    NzDateRenderFieldConfig,
    NzDisabledFieldConfig,
    NzDisabledDateFieldConfig,
    NzLocaleFieldConfig,
    NzOpenFieldConfig,
    NzPopupStyleFieldConfig,
    NzDropdownClassNameFieldConfig,
    NzSizeFieldConfig,
    NzStyleFieldConfig,
  ]}
];
