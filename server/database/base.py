from sqlalchemy.ext.declarative import declarative_base

from database.db_session import db_session

Base = declarative_base()
Base.query = db_session.query_property()