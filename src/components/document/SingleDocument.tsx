import { useNavigate } from "react-router-dom"
import useDocument from "../../hooks/useDocument"
import { IDocShare } from "../../models/DocShare"

type Props = {
  document: IDocShare
}

export default function SingleDocument({ document }: Props) {
  const navigate = useNavigate()
  const { deleteDocument } = useDocument('documents')

  const handleClickUpdate = () => {
    navigate(`/update/documents/${document.id}`)
  }

  const handleClickDelete = async () => {
    await deleteDocument(document.id as string, document.docUrl as string)
  }

  return (      
    <tr>
      <td>{document.title}</td>
      <td>{document.category}</td>
      <td>
        <a href={document.docUrl} target="_blank">
          <i className="fa-solid fa-download"></i>
        </a>
      </td>
      <td>
        <button 
          className="updateDoc"
          onClick={handleClickUpdate}
        >
          <i className="fa-solid fa-pencil"></i>
        </button>
      </td>
      <td>
        <button 
          className="deleteDoc"
          onClick={handleClickDelete}
        >
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </td>
    </tr>
  )
}
