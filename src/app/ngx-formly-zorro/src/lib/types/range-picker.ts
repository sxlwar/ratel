import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { useDefaultIfUnset } from '../utils';

@Component({
    selector: 'formly-field-antd-range-picker',
    template: `
        <nz-range-picker
            [formControl]="formControl"
            [formlyAttributes]="field"
            [class.ng-dirty]="showError"
            [nzAllowClear]="nzAllowClear"
            [nzAutoFocus]="nzAutoFocus"
            [nzClassName]="nzClassName"
            [nzDateRender]="nzDateRender"
            [nzDisabled]="nzDisabled"
            [nzDisabledDate]="nzDisabledDate"
            [nzLocale]="nzLocale"
            [nzPopupStyle]="nzPopupStyle"
            [nzDropdownClassName]="nzDropdownClassName"
            [nzSize]="nzSize"
            [nzStyle]="nzStyle"
            [nzDisabledTime]="nzDisabledTime"
            [nzFormat]="nzFormat"
            [nzRanges]="nzRanges"
            [nzRenderExtraFooter]="nzRenderExtraFooter"
            [nzShowTime]="nzShowTime"
            [nzShowToday]="nzShowToday"
            [nzPlaceHolder]="nzPlaceHolder"
        ></nz-range-picker>
    `,
})
export class FormlyFieldRangePicker extends FieldType {
    get nzAllowClear() {
        return this.to!.nzAllowClear;
    }

    get nzAutoFocus() {
        return this.to!.nzAutoFocus;
    }

    get nzClassName() {
        return this.to!.nzClassName;
    }

    get nzDateRender() {
        return this.to!.nzDateRender;
    }

    get nzDisabled() {
        return this.to!.nzDisabled;
    }

    get nzDisabledDate() {
        return useDefaultIfUnset(this.to!.nzDisabledDate, () => false);
    }

    get nzLocale() {
        return this.to!.nzLocale;
    }

    /**
     * TODO: Temporary does not support;
     */
    // get nzOpen() {
    //     return this.to!.nzOpen;
    // }

    get nzPopupStyle() {
        return this.to!.nzPopupStyle;
    }

    get nzDisabledTime() {
        return useDefaultIfUnset(this.to!.nzDisabledTime, () => {});
    }

    get nzDropdownClassName() {
        return this.to!.nzDropdownClassName;
    }

    get nzSize() {
        return this.to!.nzSize;
    }

    get nzStyle() {
        return this.to!.nzStyle;
    }

    get nzFormat() {
        return this.to!.nzFormat;
    }

    get nzRanges() {
        return this.to!.nzRanges;
    }

    get nzRenderExtraFooter() {
        return this.to!.nzRenderExtraFooter;
    }

    get nzShowTime() {
        return this.to!.nzShowTime;
    }

    get nzShowToday() {
        return this.to!.nzShowToday;
    }
    get nzPlaceHolder() {
        return this.to!.nzPlaceHolder;
    }
}
