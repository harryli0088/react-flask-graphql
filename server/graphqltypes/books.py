import graphene
from graphene_sqlalchemy import SQLAlchemyObjectType

from models.books import Books as BooksModel


class Books(SQLAlchemyObjectType):
    class Meta:
        model = BooksModel
        interfaces = (graphene.relay.Node,)


class BookAttribute:
    genre_id = graphene.String()
    name = graphene.String()


class CreateBookInput(graphene.InputObjectType, BookAttribute):
    pass


class DeleteBookAttribute:
    id = graphene.String()

class DeleteBookInput(graphene.InputObjectType, DeleteBookAttribute):
    pass