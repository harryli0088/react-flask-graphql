import { useQuery } from "@apollo/client";
import { BooksDocument, BooksQuery } from '../graphql/generated';

export default function Books() {
  const { loading, error, data } = useQuery<BooksQuery>(BooksDocument);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error requesting books</p>;

  return (
    <table>
      <thead>
        <tr><th>Book</th><th>Genre</th></tr>
      </thead>
      <tbody>
        {data?.books?.map((b) => b && (
          <tr key={b.name}>
            <td>{b.name}</td><td>{b.genre?.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
