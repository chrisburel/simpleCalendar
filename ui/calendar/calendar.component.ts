import { Component } from '@angular/core';
import './rxjs-operators';
import moment = require('moment');

import {CalendarMonthComponent} from './calendar-month.component';

@Component({
    selector: 'calendar',
    templateUrl: 'calendar/calendar.component.html',

    directives: [
        CalendarMonthComponent,
    ],
})
export class CalendarComponent {
    now = moment();
}
