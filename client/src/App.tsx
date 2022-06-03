import logo from './logo.svg';
import flaskLogo from './flask_logo.png';
import graphqlLogo from './graphql_logo.png';
import sqlite3Logo from './sqlite3_logo.png';
import './App.css';

import Books from "./Components/Books"
import CreateBook from "./Components/CreateBook"
import Files from "./Components/Files"
import UploadFile from "./Components/UploadFile"
import Blanchor from './Components/Blanchor';

//TODO create/delete genre
//TODO description and footer

function App() {
  return (
    <>
      <header className="App-header">
        <br/><br/>
        <h1>React Flask GraphQL SQLite3 Application</h1>
        <br/><br/>
        <div className="flex">
          <img src={logo} alt="react logo"/>
          <img src={flaskLogo} alt="flask logo"/>
        </div>
        <div className="flex">
          <img src={graphqlLogo} alt="graphql logo"/>
          <img src={sqlite3Logo} alt="sqlite3 logo"/>
        </div>
        <br/><br/><br/>
      </header>

      <section>
        <div className="flex">
          <CreateBook/>

          <Books/>
        </div>
      </section>

      <section>
        <div className="flex">
          <UploadFile/>

          <Files/>
        </div>
      </section>

      <footer>
        <h2>React Frontend</h2>

        <p>
          I created the Client with <Blanchor href="https://create-react-app.dev/">create-react-app</Blanchor> and am using <Blanchor href="https://react-query.tanstack.com/">react-query</Blanchor> to handle network requests and <Blanchor href="https://www.graphql-code-generator.com/">graphql-codegen</Blanchor> to automatically generate TypeScript compatible hooks from the GraphQL schema. You can checkout the `graphql-codegen` configuration at <Blanchor href="client/codegen.yml">client/codegen.yml</Blanchor>.
        </p>
        <p>
          Originally, I had been using <Blanchor href="https://www.apollographql.com/docs/react/">@apollo/client</Blanchor> to handle the network requests, but <code>react-query</code> felt cleaner, since I wanted to use it for generic HTTP requests anyways.
        </p>
      
        <h2>Flask GraphQL Backend</h2>

        <p>I created the backend GraphQL Server using Flask based off <Blanchor href="https://medium.com/swlh/python-flask-with-graphql-server-with-sqlalchemy-and-graphene-and-sqlite-ac9fcc9d3d83">this tutorial</Blanchor>. After installing the Python packages and getting the server running, the GraphQL API will be available at <Blanchor href="http://localhost:8000/graphql">http://localhost:8000/graphql</Blanchor></p>

        <h2>Features</h2>

        <ul>
          <li>Create/Read/Delete Books via GraphQL</li>
          <li>Read Genres via GraphQL</li>
          <li>Upload/Download Files via HTTP Fetch</li>
          <li>Delete Files via GraphQL</li>
        </ul>

        <h2>TODOs</h2>
        <ul>
          <li>Create/Delete Genres</li>
          <li>API Input Validation</li>
          <li>Testing</li>
        </ul>

        <hr/>
        <p><b>GitHub Repo:</b> <Blanchor href="https://github.com/harryli0088/react-flask-graphql">https://github.com/harryli0088/react-flask-graphql</Blanchor></p>
      </footer>
    </>
  );
}

export default App;
