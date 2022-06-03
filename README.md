# React Flask GraphQL SQLite3 Application

This is an experimental application I made using React on the frontend, Flask as the backend, SQLite3 as the database, and GraphQL to communicate between the front and backends.

## Frontend React Client

I created the Client with [create-react-app](https://create-react-app.dev/) and am using [react-query](https://react-query.tanstack.com/) to handle network requests and [graphql-codegen](https://www.graphql-code-generator.com/) to automatically generate TypeScript compatible hooks from the GraphQL schema. You can checkout the `graphql-codegen` configuration at [client/codegen.yml](client/codegen.yml).

Originally, I had been using [@apollo/client](https://www.apollographql.com/docs/react/) to handle the network requests, but `react-query` felt cleaner, since I wanted to use it for generic HTTP requests anyways.

### Installation

```
cd client
npm i
```

### Run the Client

```
npm start
```

## Backend Python Flask Server

I created the backend GraphQL Server using Flask based off this tutorial: https://medium.com/swlh/python-flask-with-graphql-server-with-sqlalchemy-and-graphene-and-sqlite-ac9fcc9d3d83

### Create a conda environment
```
conda create --name react-flask-graphql python=3.8
```

### Activate the environment
```
conda activate react-flask-graphql
```

### Install packages 
```
pip install Flask Flask-GraphQL flask_cors graphql-core==2.2.1 graphene==2.1.8 graphene-sqlalchemy SQLAlchemy
```

graphql-core and graphene versions were selected based on this thread: https://github.com/graphql-python/graphene/issues/1086#issuecomment-543788523

### Run the Server
```
cd server
python main.py
```

The server should open on port 8000, and the GraphQL API will be available on http://localhost:8000/graphql

### Uploading Files through GraphQL
I originally had implemented file upload through GraphQL using this package https://github.com/lmcgartland/graphene-file-upload, but decided to make it plain HTTP.


## Altair GraphQL Client
This is a nice, feature-rich GraphQL client that you can use instead of the default UI at http://localhost:8000/graphql

https://altair.sirmuel.design/

### Example File Upload Mutation
```
mutation UploadFile($file:Upload!) {
  uploadFile(file: $file) {
    success
  }
}
```

Click Variables > Add files
