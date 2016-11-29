import { Component, Input, EventEmitter } from '@angular/core';
import moment = require('moment');

import { Event } from './event';

@Component({
    selector: 'create-event',
    templateUrl: 'calendar/create-event.component.html',
})
export class CreateEventComponent {
    @Input()
    date;

    event: Event;
    x: number;
    y: number;

    accepted = new EventEmitter();
    rejected = new EventEmitter();

    constructor() {
        this.event = new Event();
        this.event.isAllDay = true;
    }

    accept() {
        this.accepted.emit();
    }

    reject() {
        this.rejected.emit();
    }

    setStartDate(startDate) {
        this.event.startDate = startDate;
    }
}
