import { Injectable, EventEmitter } from '@angular/core';
import moment = require('moment');

import { Event } from './event';

@Injectable()
export class EventService {
    events: Event[] = [];

    eventCreated = new EventEmitter();

    getEvents(): Promise<Event[]> {
        return Promise.resolve(this.events);
    }

    createEvent(event:Event) {
        this.events.push(event);
        this.eventCreated.emit(event);
    }
}
