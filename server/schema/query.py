import graphene
from graphene import relay, String

from models.genres import Genres as GenresModel
from models.books import Books as BooksModel
from graphqltypes.books import Books
from graphqltypes.files import Files

from os import listdir
from os.path import getmtime, isfile, join


class Query(graphene.ObjectType):
    node = relay.Node.Field()

    books_by_name = graphene.List(Books, name=graphene.String())
    books_by_genre = graphene.List(Books, name=graphene.String())

    files = graphene.List(Files)
    hello = String(name=String(default_value="stranger"))
    goodbye = String()

    @staticmethod
    def resolve_books_by_name(parent, info, **args):
        q = args.get('name')

        books_query = Books.get_query(info)

        return books_query.filter(BooksModel.name.contains(q)).all()

    @staticmethod
    def resolve_books_by_genre(parent, info, **args):
        q = args.get('name')

        books_query = Books.get_query(info)

        return books_query.join(GenresModel).filter(GenresModel.name == q).all()

    @staticmethod
    def resolve_files(root, info):
        mypath = "files"
        return [
            {"name":f,"last_modified":getmtime(join(mypath, f))} 
            for f in listdir(mypath) 
            if isfile(join(mypath, f)) and f!=".gitignore"
        ]

    @staticmethod
    def resolve_hello(root, info, name):
        return f'Hello {name}!'

    @staticmethod
    def resolve_goodbye(root, info):
        return 'See ya!'