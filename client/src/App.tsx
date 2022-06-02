import React from 'react';
import logo from './logo.svg';
import './App.css';

import {
  useQuery,
  gql
} from "@apollo/client";

const FILES = gql`
  query Files {
    files {
      name
      lastModified
    }
  }
`;

function Files() {
  const { loading, error, data } = useQuery(FILES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.files.map(({ name, lastModified }:{name:string, lastModified:number}) => (
    <div key={name}>
      <p>
        {name}, {new Date(lastModified*1000).toLocaleDateString()}
      </p>
    </div>
  ));
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Files/>
      </header>
    </div>
  );
}

export default App;
