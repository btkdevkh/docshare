import { Timestamp } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Select from 'react-select'
import { timestamp } from "../firebase/db"
import { useAuthContext } from "../hooks/useAuthContext"
import useDocument from "../hooks/useDocument"
import { IDocShare } from "../models/DocShare"

const categories = [
  { value: 'health', label: 'Health' },
  { value: 'government', label: 'Government' },
  { value: 'invoice', label: 'Invoice' },
]

export default function CreateDoc() {
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const { error, success, loading, addDocument } = useDocument('documents')

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [docFileError, setDocFileError] = useState('')
  const [docFile, setDocFile] = useState<File | null>(null)

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocFile(null)

    let fileSelected = e.target.files![0];

    if(!fileSelected) {      
      setDocFileError('No file selected')
      return
    }

    if(!fileSelected.type.includes('application/pdf')) {      
      setDocFileError('File must be PDF only')
      return
    }

    if(fileSelected.size > 500000) {      
      setDocFileError('File must be less than 500kb')
      return
    }

    setDocFileError('')
    setDocFile(fileSelected)
  }

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  
    setDocFileError('')
    
    const document: IDocShare = {
      title,
      category,
      createdAt: date ? date : timestamp() as Timestamp,
      uid: user?.uid
    }

    await addDocument(document, docFile as File)
  }

  useEffect(() => {
    success && navigate('/')
  }, [success])

  return (
    <div className="uploadDocs">
      <form onSubmit={onSubmitHandler}>
        <h2>Upload Docs</h2>
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
        <label>
          Document (PDF)*
          <input 
            type="file" 
            onChange={fileChangeHandler}
          />
          {docFileError && <div className="error">{docFileError}</div>}
        </label>

        <button type="submit">{loading ? 'Processing...' : 'Submit'}</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}
