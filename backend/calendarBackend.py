#!/usr/bin/env python

from flask import Flask
from flask.ext.restful import Api

app = Flask(__name__)
api = Api(app)

from calendardb.resources import EventListResource

api.add_resource(EventListResource, '/api/v1.0/events', endpoint='events')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, threaded=True)

