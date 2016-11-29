from sqlalchemy import Column, Boolean, DateTime, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Event(Base):
    __tablename__ = 'events'

    id = Column(Integer, primary_key=True)
    description = Column(String(255))
    startDate = Column(DateTime(timezone=True))
    endDate = Column(DateTime(timezone=True))
    isAllDay = Column(Boolean)
