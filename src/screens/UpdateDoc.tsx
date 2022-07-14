import { Timestamp } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Select from 'react-select'
import { timestamp } from "../firebase/db"
import { useAuthContext } from "../hooks/useAuthContext"
import useCollection from "../hooks/useCollection"
import useDocument from "../hooks/useDocument"
import { IDocShare } from "../models/DocShare"

const categories = [
  { value: 'health', label: 'Health' },
  { value: 'government', label: 'Government' },
  { value: 'invoice', label: 'Invoice' },
]

export default function UpdateDoc() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const { error, success, loading, updateDocument } = useDocument('documents')  
  const { documents } = useCollection('documents', false) 

  const docTUD = documents?.find(doc => doc.id === id)  

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  
    
    const document: IDocShare = {
      title,
      category,
      createdAt: date ? date : timestamp() as Timestamp,
      uid: user?.uid
    }

    await updateDocument(id as string, document)
  }

  useEffect(() => {    
    if(docTUD) {
      setTitle(docTUD.title)
    }

    success && navigate('/')
  }, [success, docTUD])

  return (
    <div className="uploadDocs">
      <form onSubmit={onSubmitHandler}>
        <h2>Update Docs</h2>
        <label>
          Title*
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Categories*
          <Select 
            className="select"
            options={categories}
            onChange={(option) => setCategory(option?.value!)}
          />
        </label>
        <label>
          Create Date
          <input 
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <button type="submit">{loading ? 'Processing...' : 'Submit'}</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}
