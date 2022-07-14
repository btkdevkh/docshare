import { auth, store } from '../firebase/db';
import { doc, updateDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

const useSignin = () => {
  const { dispatch } = useAuthContext()

  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const signin = async (email: string, password: string) => {    
    setError(null)
    setSuccess(false)
    setLoading(true)

    try {
      if(!email || !password) {        
        setError('Please fill all fields')
        return
      }

      const res = await signInWithEmailAndPassword(auth, email, password)

      if(!res) throw new Error('Could not complete the signin')

      await updateDoc(doc(store, 'users', res.user.uid), { online: true })

      dispatch({ type: 'LOGIN', payload: res.user })

      setSuccess(true)
      setError(null)
      setLoading(false)

      return res
    } catch (err: any) {
      console.log(err.message);
      setError(err.message);
      setSuccess(false)
      setLoading(false);
    }
  }

  return { error, success, loading, signin }
}

export default useSignin;
