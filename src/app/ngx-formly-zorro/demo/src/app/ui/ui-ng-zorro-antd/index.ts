import { InputAppComponent, InputExampleConfig, InputAppModule } from './input';
import { TextareaAppComponent, TextareaExampleConfig, TextareaAppModule } from './textarea';
import { InputNumberAppComponent, InputNumberExampleConfig, InputNumberAppModule } from './input-number';
import { CheckboxAppComponent, CheckboxAppModule, CheckboxExampleConfig } from './checkbox';
import { RadioAppComponent, RadioAppModule, RadioExampleConfig } from './radio';
import { SelectAppComponent, SelectAppModule, SelectExampleConfig } from './select';
import { CascaderExampleConfig, CascaderAppComponent, CascaderAppModule } from './cascader';
import { AutocompleteAppComponent, AutocompleteAppModule, AutocompleteExampleConfig } from './autocomplete';
import { DatePickerAppComponent, DatePickerAppModule, DatePickerExampleConfig } from './datepicker';
import { YearPickerAppComponent, YearPickerExampleConfig, YearPickerAppModule } from './yearpicker';
import { MonthPickerAppComponent, MonthPickerAppModule, MonthPickerExampleConfig } from './monthpicker';
import { WeekPickerAppComponent, WeekPickerExampleConfig, WeekPickerAppModule } from './weekpicker';
import { RangePickerAppComponent, RangesPickerExampleConfig, RangePickerAppModule } from './rangepicker';

export const NG_ZORRO_COMPONENTS = [
  AutocompleteAppComponent,
  CascaderAppComponent,
  InputAppComponent,
  TextareaAppComponent,
  InputNumberAppComponent,
  CheckboxAppComponent,
  RadioAppComponent,
  SelectAppComponent,
  DatePickerAppComponent,
  YearPickerAppComponent,
  MonthPickerAppComponent,
  WeekPickerAppComponent,
  RangePickerAppComponent,
];

export const NG_ZORRO_EXAMPLE_CONFIGS = [
  AutocompleteExampleConfig,
  CascaderExampleConfig,
  InputExampleConfig,
  TextareaExampleConfig,
  InputNumberExampleConfig,
  CheckboxExampleConfig,
  RadioExampleConfig,
  SelectExampleConfig,
  DatePickerExampleConfig,
  YearPickerExampleConfig,
  MonthPickerExampleConfig,
  WeekPickerExampleConfig,
  RangesPickerExampleConfig,
];

export const NG_ZORRO_EXAMPLE_MODULE = [
  AutocompleteAppModule,
  CascaderAppModule,
  InputAppModule,
  TextareaAppModule,
  InputNumberAppModule,
  CheckboxAppModule,
  RadioAppModule,
  SelectAppModule,
  DatePickerAppModule,
  YearPickerAppModule,
  MonthPickerAppModule,
  WeekPickerAppModule,
  RangePickerAppModule,
];
