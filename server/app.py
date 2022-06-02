from flask import Flask
from flask_cors import CORS
from flask_graphql import GraphQLView
from graphene_file_upload.flask import FileUploadGraphQLView

from database.db_session import db_session
from schema.schema import schema

app = Flask(__name__)
cors = CORS(app, resources={r"/*":{"origins":"*"}})

app.add_url_rule(
    '/graphql',
    view_func=FileUploadGraphQLView.as_view(
        'graphql',
        schema=schema,
        graphiql=True
    )
)


@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()