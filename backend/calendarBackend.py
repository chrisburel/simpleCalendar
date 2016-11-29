#!/usr/bin/env python

from flask import Flask
from flask.ext.restful import Api
from flask.ext.cors import CORS

app = Flask(__name__)
api = Api(app)
# Allow cross-origin resource sharing for all domains on all routes.  In a
# real-world app this would be much more restrictive.
CORS(app)

from calendardb.resources import EventListResource

api.add_resource(EventListResource, '/api/v1.0/events', endpoint='events')

if __name__ == '__main__':
    from calendardb.session import initialize
    initialize()
    app.run(host='0.0.0.0', debug=True, threaded=True)
