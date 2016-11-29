import datetime
import json

from flask.ext.restful import Resource

class EventListResource(Resource):
    def get(self):
        # To avoid the repetition of sending the field names multiple times,
        # they are sent once, followed by a list of lists of the event data
        fieldNames = (
            'id',
            'description', 
            'startDate',
            'endDate',
            'isAllDay',
        )
        eventData = ((),)

        return json.dumps((fieldNames, eventData))
