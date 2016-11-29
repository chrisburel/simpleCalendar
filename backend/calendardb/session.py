import os

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session
from sqlalchemy.orm import sessionmaker

Session = scoped_session(sessionmaker(
    autocommit=False,
    autoflush=False,
))

def initialize():
    import datetime
    from calendardb.schema import Base, Event

    # In a real-world app, the location of the database would be more
    # configurable
    engine = create_engine('sqlite:///events.db')
    Session.configure(bind=engine)

    Base.metadata.create_all(engine)
