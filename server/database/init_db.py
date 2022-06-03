from database.db_session import db_session, engine
from database.base import Base


def init_db():
    from models.genres import Genres
    from models.books import Books

    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    fantasy = Genres(name='Fantasy')
    db_session.add(fantasy)
    tragedy = Genres(name='Tragedy')
    db_session.add(tragedy)
    philosophy = Genres(name='Philosophy')
    db_session.add(philosophy)

    peter_wendy = Books(name='Harry Potter', genre=fantasy)
    db_session.add(peter_wendy)
    it_cant_happen = Books(name='The Great Gatsby', genre=tragedy)
    db_session.add(it_cant_happen)
    crooked_kingdom = Books(name='Allegory of the Cave', genre=philosophy)
    db_session.add(crooked_kingdom)

    db_session.commit()