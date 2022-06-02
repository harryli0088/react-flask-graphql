# React Python GraphQL

## React Client

### Installation

```
cd client
npm i
```

### Run the Client
```
npm start
```

I created the Python Flask GraphQL application based off this tutorial: https://medium.com/swlh/python-flask-with-graphql-server-with-sqlalchemy-and-graphene-and-sqlite-ac9fcc9d3d83

## Python

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
pip install Flask Flask-GraphQL flask_cors graphql-core==2.2.1 graphene==2.1.8 graphene-sqlalchemy SQLAlchemy graphene-file-upload
```

graphql-core and graphene versions were selected based on this thread: https://github.com/graphql-python/graphene/issues/1086#issuecomment-543788523

### Run the Server
```
cd server
python main.py
```

## Altair GraphQL Client
https://altair.sirmuel.design/

### Example File Upload Mutation
```
mutation MyMutation($file:Upload!) {
  uploadFile(file: $file) {
    success
  }
}
```

Click Variables > Add files