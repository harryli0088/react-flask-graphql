import { useQueryClient } from 'react-query'

import {
  useBooksQuery,
  useDeleteBookMutation,
} from '../graphql/generated';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default function Books() {
  const queryClient = useQueryClient()

  const { data, error, isLoading } = useBooksQuery();

  const { mutate: deleteBook } = useDeleteBookMutation({
    onSuccess: () => queryClient.refetchQueries(["books"]) //automatically refetch these queries after the mutation
  })

  if (isLoading) return <p>Loading books...</p>;
  if (error) return <p>Error requesting books</p>;

  if(data?.books?.length === 0) return <p>There are no books</p>

  return (
    <table>
      <thead>
        <tr>
          <th>Book</th>
          <th>Genre</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data?.books?.map((b) => b && (
          <tr key={b.id}>
            <td>{b.name}</td>
            <td>{b.genre?.name}</td>
            <td className="right"><FontAwesomeIcon className="icon" icon={faTimes} onClick={() => deleteBook({ id: b.id })}/></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
