import { FormlyFieldConfig } from '@ngx-formly/core';

const NzClassNameFieldConfig: FormlyFieldConfig = {
    key: 'nzClassName',
    type: 'input',
    className: 'col-md-4',
    templateOptions: {
        label: 'nzClassName',
    },
};

const NzDateRenderFieldConfig: FormlyFieldConfig = {
    key: 'nzDateRender',
    type: 'input',
    className: 'col-md-4',
    templateOptions: {
        label: 'nzDateRender',
        placeholder: 'Accept type TemplateRef<Date> | string | ((d: Date) => TemplateRef<Date>｜string)',
    },
};

const NzDisabledDateFieldConfig: FormlyFieldConfig = {
    key: 'nzDisabledDate',
    type: 'input',
    className: 'col-md-4',
    templateOptions: {
        label: 'nzDisabledDate',
    },
};

const NzPopupStyleFieldConfig: FormlyFieldConfig = {
    key: 'nzPopupStyle',
    type: 'input',
    className: 'col-md-4',
    templateOptions: {
        label: 'nzPopupStyle',
    },
};

const NzFormatFieldConfig: FormlyFieldConfig = {
    key: 'nzFormat',
    type: 'input',
    className: 'col-md-4',
    templateOptions: {
        label: 'nzFormat',
    },
};

const NzRenderExtraFooterFieldConfig: FormlyFieldConfig = {
    key: 'nzRenderExtraFooter',
    type: 'input',
    className: 'col-md-4',
    templateOptions: {
        label: 'nzRenderExtraFooter',
        disabled: true,
        placeholder: 'Accept TemplateRef<any>',
    },
};

const NzDisabledTimeFieldConfig: FormlyFieldConfig = {
    key: 'nzDisabledTime',
    type: 'input',
    className: 'col-md-4',
    templateOptions: {
        label: 'nzDisabledTime',
        placeholder: 'Accept object or boolean',
        disabled: true,
    },
};

const NzShowTimeFieldConfig: FormlyFieldConfig = {
    key: 'nzShowTime',
    type: 'input',
    className: 'col-md-4',
    templateOptions: {
        label: 'nzShowTime',
        placeholder: 'Accept object or boolean',
        disabled: true,
    },
};

const NzShowTodayFieldConfig: FormlyFieldConfig = {
    key: 'nzShowToday',
    type: 'checkbox',
    className: 'col-md-4',
    defaultValue: true,
    templateOptions: {
        label: 'nzShowToday',
    },
};


export {
    NzClassNameFieldConfig,
    NzDateRenderFieldConfig,
    NzDisabledDateFieldConfig,
    NzPopupStyleFieldConfig,
    NzFormatFieldConfig,
    NzRenderExtraFooterFieldConfig,
    NzDisabledTimeFieldConfig,
    NzShowTimeFieldConfig,
    NzShowTodayFieldConfig,
};
