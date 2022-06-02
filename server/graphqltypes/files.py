import graphene
from graphene import ObjectType, String, Float

class Files(ObjectType):
    name = String()
    last_modified = Float()
    