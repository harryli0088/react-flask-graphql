import logo from './logo.svg';
import flaskLogo from './flask_logo.png';
import graphqlLogo from './graphql_logo.png';
import sqlite3Logo from './sqlite3_logo.png';
import './App.css';

import Books from "./Components/Books"
import CreateBook from "./Components/CreateBook"
import Files from "./Components/Files"
import UploadFile from "./Components/UploadFile"

//TODO create/update/delete genre
//TODO download, delete file
//TODO description and footer

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
