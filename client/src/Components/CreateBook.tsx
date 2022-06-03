import { useEffect, useState } from 'react';

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

  const [genreId, setGenreId] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [createBook, { loading:createBookLoading, error:createBookError }] = useMutation<CreateBookMutation>(
    CreateBookDocument,
    { refetchQueries: [{query: BooksDocument}] } //automatically rerun this query after this mutation
  )

  useEffect(() => {
    if(genreId==="" && genres?.genres?.[0]?.id) {
      setGenreId(genres.genres[0].id)
    }
  },[genreId, genres])

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
        <h2>Add a New Book</h2>
        <div className="flex">
          <div>
            <label htmlFor="create-book-name">Book Name:</label>
            <input type="text" id="create-book-name" name="create-book-name" onChange={changeName}/>
          </div>

          <div>
            <label htmlFor="create-book-genre">Genre:</label>
            <select name="create-book-genre" id="create-book-genre" onChange={changeGenre}>
              {genres?.genres?.map(g => (
                g && <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
          </div>
        </div>
        <br/>
        <button disabled={!isValid}>Add Book</button>
        <br/>
        <p>{createBookLoading && `Add...`}</p>
        <p>{createBookError?.message && `Error: ${createBookError.message}`}</p>
      </form>
    </div>
  )
}

