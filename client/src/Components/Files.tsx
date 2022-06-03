import { useQuery } from "@apollo/client";
import { FilesDocument, FilesQuery } from '../graphql/generated';

export default function Files() {
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
