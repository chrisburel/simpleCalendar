import { Injectable } from '@angular/core';
import moment = require('moment');

import { Event } from './event';

@Injectable()
export class EventService {
    events: Event[] = [];

    getEvents(): Promise<Event[]> {
        return Promise.resolve(this.events);
    }
}
