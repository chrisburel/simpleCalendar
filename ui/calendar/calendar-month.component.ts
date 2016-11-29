import { Component, Input, OnInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import moment = require('moment');

import { EventService } from './event.service';
import { CreateEventComponent } from './create-event.component';

@Component({
    selector: 'calendar-month',
    templateUrl: 'calendar/calendar-month.component.html',
    providers: [EventService],
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

    events: Map<string, [Event]> = new Map<string, [Event]>();

    createEventComponent: ViewContainerRef;

    constructor(
      private viewContainerRef: ViewContainerRef,
      private componentFactoryResolver: ComponentFactoryResolver,
      private eventService: EventService,
    ) {
        this.createEventComponentFactory = this.componentFactoryResolver.resolveComponentFactory(CreateEventComponent);
        this.eventService.eventCreated.subscribe({next: event => this.onEventCreated(event)});
    }

    ngOnInit() {
        this._calculateNumWeeks();

        this.dayOffset = this.currentDate().startOf('month').day();

        this.eventService.getEvents().then(events => {
            this.events.clear();
            for (let event of events) {
                this.onEventCreated(event);
            }
        });
    }

    currentDate() {
        // All operations on a moment.js object mutate the object.  We don't
        // want `now` changing arbitrarly, so always operate on a copy.
        return moment(this.now);
    }

    eventsForIndex(row:number, column:number) {
        let date = this.momentForIndex(row, column);
        return this.events.get(date.format("YMMDD"));
    }

    momentForIndex(row:number, column:number) {
        // Return a moment object for the given row and column of the
        // calendar's table
        return this.currentDate().startOf('month').add(
            (row * this.weekdays.length) + column - this.dayOffset,
            'days'
        );
    }

    onEventCreated(event:Event) {
        let dateHash = moment(event.startDate).format("YMMDD");
        let eventsForDate = this.events.get(dateHash);
        if (!eventsForDate) {
            eventsForDate = [];
            this.events.set(dateHash, eventsForDate);
        }
        eventsForDate.push(event);
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

    showCreateNewEvent(date, event) {
        // Open a dialog to enter details for a new event on `date`.
        event.preventDefault();
        if (!this.createEventComponent) {
            this.createEventComponent = this.viewContainerRef.createComponent(this.createEventComponentFactory);
        }

        // Initialize the component's properties
        this.createEventComponent.instance.setStartDate(date);
        this.createEventComponent.instance.x = event.clientX;
        this.createEventComponent.instance.y = event.clientY;

        // Destroy the createEventComponent when the accepted or rejected event
        // is emitted
        this.createEventComponent.instance.accepted.subscribe(
            next => {
                // Post the event from the dialog to the server
                this.eventService.createEvent(this.createEventComponent.instance.event);
                this._destroyCreateEventComponent();
            }
        );
        this.createEventComponent.instance.rejected.subscribe(
            next => { this._destroyCreateEventComponent() }
        );
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

    _destroyCreateEventComponent() {
        if (this.createEventComponent) {
            this.createEventComponent.destroy();
            this.createEventComponent = undefined;
        }
    }
}
