import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { DateHelperService } from 'ng-zorro-antd';

@Injectable()
export class DateHelper extends DateHelperService {
    getISOWeek(date: Date) {
        return moment(date).isoWeekYear();
    }

    getFirstDayOfWeek() {
        return this.config.firstDayOfWeek == null ? 1 : this.config.firstDayOfWeek;
    }

    format(date: Date, formatStr: string) {
        return moment(date).format(formatStr);
    }
}
