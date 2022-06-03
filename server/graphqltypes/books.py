import graphene
from graphene_sqlalchemy import SQLAlchemyObjectType

from models.books import Books as BooksModel


class Books(SQLAlchemyObjectType):
    class Meta:
        model = BooksModel
        interfaces = (graphene.relay.Node,)


class BookAttribute:
    author = graphene.String()
    genre_id = graphene.String()
    name = graphene.String()


class CreateBookInput(graphene.InputObjectType, BookAttribute):
    pass