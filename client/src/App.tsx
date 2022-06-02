import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  useQuery,
  gql,
  useMutation
} from "@apollo/client";
import { FilesDocument, FilesQuery, UploadFileDocument, UploadMutation } from './graphql/generated';

function Files() {
  const { loading, error, data } = useQuery<FilesQuery>(FilesDocument);

  if (loading) return <p>Loading files...</p>;
  if (error) return <p>Error requesting files</p>;

  return (
    <table>
      <thead>
        <tr><th>File Name</th><th>Last Modified</th></tr>
      </thead>
      <tbody>
        {data?.files?.map((f) => f && (
          <tr key={f.name}>
            <td>{f.name}</td><td>{f.lastModified && new Date(f.lastModified*1000).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function UploadFile() {
  const [file, setFile] = useState<File | null>(null)
  const [uploadFile, { data, loading, error }] = useMutation<UploadMutation>(UploadFileDocument)

  const selectFileUpload = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files?.[0]) {
      setFile(e.target.files?.[0])
    }
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("file",file)
    if(file) {
      uploadFile({variables:{file}})
    }
  }

  return (
    <div>
      <form onSubmit={submit}>
        <label htmlFor="upload-file">Select a file to upload:</label>
        <input type="file" id="upload-file" name="upload-file" onChange={selectFileUpload}/>
        <br/><br/>
        <button disabled={!file}>{file ? "Upload File" : "Select a File..."}</button>
        <br/>
        <p>{error?.message && `Error: ${error.message}`}</p>
      </form>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <section>
        <Files/>

        <UploadFile/>
      </section>
    </div>
  );
}

export default App;
