import { useState } from "react"
import useSignup from "../hooks/useSignup"

export default function Register() {
  const { error, loading, signup } = useSignup()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayname, setDisplayname] = useState('')
  const [thumbnailError, setThumbnailError] = useState('')
  const [thumbnail, setThumbnail] = useState<File | null>(null)

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThumbnail(null)

    let fileSelected = e.target.files![0];

    if(!fileSelected) {      
      setThumbnailError('No file selected')
      return
    }

    if(!fileSelected.type.includes('image')) {      
      setThumbnailError('File must be an image')
      return
    }

    if(fileSelected.size > 100000) {      
      setThumbnailError('File must be less than 100kb')
      return
    }

    setThumbnailError('')
    setThumbnail(fileSelected)
  }

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();    
    await signup(email, password, displayname, thumbnail as File)
  }

  return (
    <div className="register">
      <form onSubmit={onSubmitHandler}>
        <h2>Register</h2>
        <label>
          Nickname
          <input 
            type="text" 
            value={displayname}
            onChange={(e) => setDisplayname(e.target.value)}
          />
        </label>
        <label>
          Email
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Image Profile
          <input 
            type="file" 
            onChange={fileChangeHandler}
          />
          {thumbnailError && <div className="error">{thumbnailError}</div>}
        </label>

        <button type="submit">{loading ? 'Processing...' : 'Submit'}</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}
