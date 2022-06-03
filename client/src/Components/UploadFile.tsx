import { useState } from 'react';

import {
  useMutation
} from "@apollo/client";
import { FilesDocument, UploadFileDocument, UploadMutation } from '../graphql/generated';

export default function UploadFile() {
  const [file, setFile] = useState<File | null>(null)
  const [uploadFile, { loading, error }] = useMutation<UploadMutation>(
    UploadFileDocument,
    { refetchQueries: [{query: FilesDocument}] } //automatically rerun this query after this mutation
  )

  const selectFileUpload = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files?.[0]) {
      setFile(e.target.files?.[0])
    }
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
        <p>{loading && `Uploading...`}</p>
        <p>{error?.message && `Error: ${error.message}`}</p>
      </form>
    </div>
  )
}

