import datetime
import dateutil.parser
import json
import pytz

from flask.ext.restful import Resource, reqparse

from calendardb.session import Session
from calendardb.schema import Event

class DateTimeJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            # By default, the datetime that comes back from the database has no
            # timezone information.  To avoid ambiguity in the client, add the
            # timezone information here.  Database times will always be UTC.
            # It's up to the client to localize the times for display.
            obj = obj.replace(tzinfo=pytz.utc)
            return '{0}'.format(obj)
        return super(DateTimeJSONEncoder, self).default(obj)

class EventListResource(Resource):
    def get(self):
        session = Session()
        events = session.query(Event).all()

        # To avoid the repetition of sending the field names multiple times,
        # they are sent once, followed by a list of lists of the event data
        fieldNames = (
            'id',
            'description', 
            'startDate',
            'endDate',
            'isAllDay',
        )
        eventData = [[getattr(e, field) for field in fieldNames] for e in events]

        return json.dumps((fieldNames, eventData), cls=DateTimeJSONEncoder)

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument(
            'events',
            type=list,
            location='json',
            required=True,
        )

        args = parser.parse_args()

        session = Session()
        createdEvents = []
        for eventData in args.events:
            event = Event()
            for (field, value) in eventData.iteritems():
                if (field in ('startDate, endDate')):
                    value = dateutil.parser.parse(value)
                setattr(event, field, value)
            session.add(event)
            createdEvents.append(event)
        session.commit()

        return json.dumps([event.id for event in createdEvents])
