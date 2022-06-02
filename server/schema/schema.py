import graphene

from schema.query import Query
from schema.mutation import Mutation

from graphqltypes.genres import Genres
from graphqltypes.books import Books
from graphqltypes.characters import Characters

schema = graphene.Schema(query=Query, mutation=Mutation, types=[Genres, Books, Characters])