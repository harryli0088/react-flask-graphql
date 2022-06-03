import { useFilesQuery } from '../graphql/generated';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { SERVER_URL } from '../index';

export default function Files() {
  const { error, data, isLoading } = useFilesQuery();

  if (isLoading) return <p>Loading files...</p>;
  if (error) return <p>Error requesting files</p>;

  return (
    <table>
      <thead>
        <tr><th></th><th>File Name</th><th>Last Modified</th></tr>
      </thead>
      <tbody>
        {data?.files?.map((f) => f && (
          <tr key={f.name}>
            <td><a href={`${SERVER_URL}/download/${f.name}`} download>
              <span style={{color: "black"}}><FontAwesomeIcon className="icon" icon={faDownload}/></span>
            </a></td>
            <td>{f.name}</td>
            <td>{f.lastModified && new Date(f.lastModified*1000).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
