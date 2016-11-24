import { Component, Input, OnInit } from '@angular/core';
import moment = require('moment');

@Component({
    selector: 'calendar-month',
    templateUrl: 'calendar/calendar-month.component.html',
})
export class CalendarMonthComponent implements OnInit {
    @Input()
    now;

    // A list of the days of the week.
    weekdays = moment.weekdays();

    // The number of weeks to display for this month.  For example, if the
    // first day of the month is a Saturday, and the month has 31 days, there
    // will be 6 weeks, and weeks will contain [0,1,2,3,4,5]
    weeks: Array<nubmer>;

    // The distance from the first day of the month to the start of the first
    // week displayed for this month.  If the first day of the month is a
    // Tuesday, dayOffset will equal 2 (where Sunday is 0)
    dayOffset: number;

    ngOnInit() {
        this._calculateNumWeeks();

        this.dayOffset = this.currentDate().startOf('month').day();
    }

    currentDate() {
        // All operations on a moment.js object mutate the object.  We don't
        // want `now` changing arbitrarly, so always operate on a copy.
        return moment(this.now);
    }

    momentForIndex(row:number, column:number) {
        // Return a moment object for the given row and column of the
        // calendar's table
        return this.currentDate().startOf('month').add(
            (row * this.weekdays.length) + column - this.dayOffset,
            'days'
        );
    }

    setCurrentDate(newNow) {
        this.now = newNow;
        this._calculateNumWeeks();
        this.dayOffset = this.currentDate().startOf('month').day();
    }

    setToPreviousMonth() {
        this.setCurrentDate(this.currentDate().subtract(1, 'months'));
    }

    setToNextMonth() {
        this.setCurrentDate(this.currentDate().add(1, 'months'));
    }

    _calculateNumWeeks() {
        // Determine how many weeks to display for this month
        let first = this.currentDate().startOf('month').week();
        let last = this.currentDate().endOf('month').week();

        if(first > last) {
            last = first + last;
        }
        let numWeeksToDisplay = last - first + 1
        // Make an array of numbers that the html template uses to know how
        // many rows to include in this month's calendar table
        this.weeks = Array(numWeeksToDisplay).fill().map((x,i)=>i);
    }
}
