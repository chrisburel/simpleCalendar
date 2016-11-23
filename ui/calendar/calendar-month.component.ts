import { Component, Input } from '@angular/core';
import moment = require('moment');

@Component({
    selector: 'calendar-month',
    templateUrl: 'calendar/calendar-month.component.html',
})
export class CalendarMonthComponent {
    @Input()
    now;
}
