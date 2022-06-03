
import graphene

from database.db_session import db_session
from models.books import Books as BooksModel
from models.books import Genres as GenresModel
from graphqltypes.books import Books, CreateBookInput, DeleteBookInput
from graphqltypes.genres import Genres, CreateGenreInput, DeleteGenreInput
from utils.input_to_dictionary import input_to_dictionary

import os
from os.path import join

class CreateBook(graphene.Mutation):
    book = graphene.Field(lambda: Books)
    ok = graphene.Boolean()

    class Arguments:
        input = CreateBookInput(required=True)

    @staticmethod
    def mutate(self, info, input):
        data = input_to_dictionary(input)
        book = BooksModel(**data)
        db_session.add(book)
        db_session.commit()
        ok = True
        return CreateBook(book=book, ok=ok)

class DeleteBook(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        input = DeleteBookInput(required=True)

    @staticmethod
    def mutate(self, info, input):
        data = input_to_dictionary(input)
        Books.get_query(info).filter_by(id=data["id"]).delete()
        db_session.commit()
        ok = True # TODO change ok if nothing was deleted?
        return DeleteBook(ok=ok)



class CreateGenre(graphene.Mutation):
    genre = graphene.Field(lambda: Genres)
    ok = graphene.Boolean()

    class Arguments:
        input = CreateGenreInput(required=True)

    @staticmethod
    def mutate(self, info, input):
        data = input_to_dictionary(input)
        genre = GenresModel(**data)
        db_session.add(genre)
        db_session.commit()
        ok = True
        return CreateGenre(genre=genre, ok=ok)

class DeleteFile(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        name = graphene.String()

    @staticmethod
    def mutate(self, info, name, **kwargs):
        os.remove(join("files",name)) # TODO get from app config?
        return DeleteFile(success=True)



class Mutation(graphene.ObjectType):
    createBook = CreateBook.Field()
    deleteBook = DeleteBook.Field()

    createGenre = CreateGenre.Field()

    deleteFile = DeleteFile.Field()
