from database.db_session import db_session, engine
from database.base import Base


def init_db():
    from models.genres import Genres
    from models.books import Books

    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    fantasy = Genres(name='Fantasy')
    db_session.add(fantasy)
    political_fiction = Genres(name='Political Fiction')
    db_session.add(political_fiction)
    philosophical_novel = Genres(name='Philosophical Novel')
    db_session.add(philosophical_novel)

    peter_wendy = Books(name='Peter & Wendy', author='J.M. Barrie', genre=fantasy)
    db_session.add(peter_wendy)
    it_cant_happen = Books(name='It Can\'t Happen Here', author='Sinclair Lewis',
                           genre=political_fiction)
    db_session.add(it_cant_happen)
    crooked_kingdom = Books(name='Crooked Kingdom', author='Leigh Bardugo', genre=fantasy)
    db_session.add(crooked_kingdom)
    crime_punishment = Books(name='Crime and Punishment', author='Fyodor Dostoyevsky',
                             genre=philosophical_novel)
    db_session.add(crime_punishment)

    db_session.commit()