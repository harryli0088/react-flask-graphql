from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_graphql import GraphQLView
from graphene_file_upload.flask import FileUploadGraphQLView

from database.db_session import db_session
from schema.schema import schema


app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = "files"
cors = CORS(app, resources={r"/*":{"origins":"*"}})

app.add_url_rule(
    '/graphql',
    view_func=FileUploadGraphQLView.as_view(
        'graphql',
        schema=schema,
        graphiql=True
    )
)

@app.route("/")
def hello_world():
    return "<p>Welcome to the Flask SQLite3 GraphQL Application! Check out <a href='/graphql'>/graphql</a> to see the GraphQL API.</p>"

# https://flask.palletsprojects.com/en/2.1.x/api/#flask.send_from_directory
@app.route('/download/<path:filename>', methods=['GET'])
def download(filename):
    return send_from_directory(
        app.config['UPLOAD_FOLDER'], filename, as_attachment=True
    )


@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()