import logo from './logo.svg';
import './App.css';

import Books from "./Components/Books"
import CreateBook from "./Components/CreateBook"
import Files from "./Components/Files"
import UploadFile from "./Components/UploadFile"

//TODO create/update/delete book
//TODO create/update/delete genre
//TODO download file
//TODO styling

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <section>
        <Books/>

        <CreateBook/>
      </section>

      <section>
        <Files/>

        <UploadFile/>
      </section>
    </div>
  );
}

export default App;
