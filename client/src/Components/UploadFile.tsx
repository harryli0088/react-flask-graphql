import { useMutation, useQueryClient } from 'react-query'

import { SERVER_URL } from '../index'

export default function UploadFile() {
  const queryClient = useQueryClient()

  const { mutate:uploadFile, error, isError, isLoading } = useMutation((file:File) => {
    const formData = new FormData()
    formData.append('file', file)
    return fetch(`${SERVER_URL}/upload`, { method: "POST", body: formData })
  },{
    onSuccess: () => queryClient.refetchQueries(["files"]) //automatically refetch these queries after the mutation
  })

  const selectFileUpload = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files?.[0]) {
      uploadFile(e.target.files[0])
    }
  }

  return (
    <div>
      <h2>Upload a New File</h2>
      <label className="button" htmlFor="upload-file">Upload a File</label>
      <input type="file" id="upload-file" name="upload-file" onChange={selectFileUpload}/>

      <p>{isLoading && `Uploading...`}</p>
      <p>{isError && `Error: ${error}`}</p>
    </div>
  )
}

