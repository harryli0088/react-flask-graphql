import { useState } from 'react';

import {
  useMutation
} from "@apollo/client";
import { FilesDocument, UploadFileDocument, UploadMutation } from '../graphql/generated';

export default function UploadFile() {
  const [uploadFile, { loading, error }] = useMutation<UploadMutation>(
    UploadFileDocument,
    { refetchQueries: [{query: FilesDocument}] } //automatically rerun this query after this mutation
  )

  const selectFileUpload = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files?.[0]) {
      uploadFile({variables:{file: e.target.files[0]}})
    }
  }

  return (
    <div>
      <h2>Upload a New File</h2>
      <label className="button" htmlFor="upload-file">Upload a File</label>
      <input type="file" id="upload-file" name="upload-file" onChange={selectFileUpload}/>

      <p>{loading && `Uploading...`}</p>
      <p>{error?.message && `Error: ${error.message}`}</p>
    </div>
  )
}

