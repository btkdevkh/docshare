import '../assets/css/Dashboard.css';
import SingleDocument from '../components/document/SingleDocument';
import useCollection from '../hooks/useCollection';

export default function Dashboard() {
  const { documents } = useCollection("documents", true)
  
  return (
    <>
    {
      documents && documents.length > 0 && (
      <div className="dashboard">
        <h3>Recent Docs</h3>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th colSpan={3}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map(doc => (
              <SingleDocument 
                key={doc.id}
                document={doc} 
              />
            ))}
          </tbody>
        </table>
      </div>)
    }
    </>
  )
}
