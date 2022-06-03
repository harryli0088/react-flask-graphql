
import graphene

from database.db_session import db_session
from models.books import Books as BooksModel
from graphqltypes.books import Books, CreateBookInput
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
    uploadFile = UploadMutation.Field()
