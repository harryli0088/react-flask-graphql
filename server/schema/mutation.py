
import graphene

from database.db_session import db_session
from models.books import Books as BooksModel
from models.books import Genres as GenresModel
from graphqltypes.books import Books, CreateBookInput, DeleteBookInput
from graphqltypes.genres import Genres, CreateGenreInput, DeleteGenreInput
from utils.input_to_dictionary import input_to_dictionary
from graphene_file_upload.scalars import Upload

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



# https://github.com/lmcgartland/graphene-file-upload
class UploadMutation(graphene.Mutation):
        class Arguments:
            file = Upload(required=True)

        success = graphene.Boolean()

        def mutate(self, info, file, **kwargs):
            file.save(join("files",file.filename))

            return UploadMutation(success=True)

class Mutation(graphene.ObjectType):
    createBook = CreateBook.Field()
    deleteBook = DeleteBook.Field()

    createGenre = CreateGenre.Field()

    uploadFile = UploadMutation.Field()
