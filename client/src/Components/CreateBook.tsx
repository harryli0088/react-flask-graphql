import { useState } from 'react';

import {
  useMutation,
  useQuery
} from "@apollo/client";
import {
  BooksDocument, 
  CreateBookMutation, 
  CreateBookDocument,
  GenresDocument,
  GenresQuery,
} from '../graphql/generated';

export default function CreateBook() {
  const { loading:genresLoading, error:genresError, data:genres } = useQuery<GenresQuery>(GenresDocument);
  console.log("genres",genres)

  const [genreId, setGenreId] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [createBook, { loading:createBookLoading, error:createBookError }] = useMutation<CreateBookMutation>(
    CreateBookDocument,
    { refetchQueries: [{query: BooksDocument}] } //automatically rerun this query after this mutation
  )

  const isValid = name.trim() && genreId.trim()

  const changeGenre = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setGenreId(e.target.value)
  }

  const changeName = (e:React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(isValid) {
      createBook({variables:{
        genreId,
        name
      }})
    }
  }

  return (
    <div>
      <form onSubmit={submit}>
        <label htmlFor="create-book-name">Book Name</label>
        <input type="text" id="create-book-name" name="create-book-name" onChange={changeName}/>
        <br/><br/>
        <label htmlFor="create-book-genre">Genre</label>
        <select name="create-book-genre" id="create-book-genre" onChange={changeGenre}>
          {genres?.genres?.map(g => (
            g && <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
        <br/><br/>
        <button disabled={!isValid}>{isValid ? "Add Book" : "Add Book Info..."}</button>
        <br/>
        <p>{createBookLoading && `Add...`}</p>
        <p>{createBookError?.message && `Error: ${createBookError.message}`}</p>
      </form>
    </div>
  )
}

