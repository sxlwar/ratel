import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

const optionGroups = [
  {
    title: 'Subject',
    children: [
      {
        title: 'AntDesign',
        count: 10000,
      },
      {
        title: 'AntDesign UI',
        count: 10600,
      },
    ],
  },
  {
    title: 'Issue',
    children: [
      {
        title: 'AntDesign is amazing',
        count: 60100,
      },
      {
        title: 'What it is AntDesign',
        count: 30010,
      },
    ],
  },
  {
    title: 'Article',
    children: [
      {
        title: 'AntDesign is design language',
        count: 100000,
      },
    ],
  },
];

@Component({
  selector: 'formly-autocomplete-type',
  template: `
    <input
      nz-input
      [nzAutocomplete]="auto"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [placeholder]="to.placeholder"
    />
    <nz-autocomplete
      [nzDefaultActiveFirstOption]="nzDefaultActiveFirstOption"
      [nzWidth]="nzWidth"
      [nzOverlayClassName]="nzOverlayClassName"
      [nzOverlayStyle]="nzOverlayStyle"
      #auto
    >
      <nz-auto-option *ngFor="let option of optionGroups" [nzValue]="option.title" [nzLabel]="option.title">
        {{ option.title }}
      </nz-auto-option>
    </nz-autocomplete>
  `,
})
export class AutocompleteTypeComponent extends FieldType implements OnInit, AfterViewInit {
  optionGroups = optionGroups;

  ngOnInit() {
    console.log(this.to);
    // super.ngOnInit();
    // this.filter = this.formControl.valueChanges.pipe(
    //   startWith(''),
    //   switchMap(term => this.to.filter(term)),
    // );
  }

  ngAfterViewInit() {

  }

  get nzBackFill() {
    return this.to!.nzBackFill;
  }

  get nzDefaultActiveFirstOption() {
    return this.to!.nzDefaultActiveFirstOption;
  }

  get nzWidth() {
    return this.to!.nzWidth;
  }

  get nzOverlayClassName() {
    return this.to!.nzOverlayClassName;
  }

  get nzOverlayStyle() {
    return this.to!.nzOverlayStyle;
  }
}
