import { useState } from "react"
import useSignin from "../hooks/useSignin"

export default function Login() {
  const { error, loading, signin } = useSignin()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();    
    await signin(email, password)
  }

  return (
    <div className="login">
      <form onSubmit={onSubmitHandler}>
        <h2>Login</h2>
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

        <button type="submit">{loading ? 'Processing...' : 'Submit'}</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}
