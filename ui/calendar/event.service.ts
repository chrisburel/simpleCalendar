import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import moment = require('moment');

import { Event } from './event';

@Injectable()
export class EventService {

    eventCreated = new EventEmitter();

    private _eventCache: Map<number, Event> = new Map<number, Event>();
    private _eventDbUrl = 'http://localhost:5000/api/v1.0';

    constructor(private http: Http) {
    }

    getEvents(): Observable<Event[]> {
        return this.http.get(this._eventDbUrl + '/events')
            .map(data => this.extractData(this, data))
            .catch(this.handleError);
    }

    createEvent(event:Event) {
        this._eventCache.set(event.id, event);
        this.eventCreated.emit(event);
    }

    private extractData(self, res: Response) {
        let body = res.json();
        if (!body) {
            return [];
        }
        let data = JSON.parse(body);
        // The JSON data from the server contains a list of lists.  The first
        // list is the names of the event data fields that were fetched.  All
        // the rest is actual task data.
        let fields = data[0];
        return data[1].map(arr => {
            let event = new Event();
            event.fromArrayData(fields, arr);
            self._eventCache.set(event.id, event);
            return event;
        });
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
