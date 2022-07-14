import { auth, store } from '../firebase/db';
import { signOut } from "firebase/auth";
import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuthContext } from './useAuthContext';

const useSignout = () => {
  const { user, dispatch } = useAuthContext()

  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const logout = async () => {    
    setError(null)
    setSuccess(false)
    setLoading(true)

    try {
      await updateDoc(doc(store, 'users', user?.uid!), { online: false })

      await signOut(auth)

      dispatch({ type: 'LOGOUT' })
      
      setSuccess(true)
      setError(null)
      setLoading(false)
    } catch (err: any) {
      console.log(err.message);
      setError(err.message);
      setSuccess(false)
      setLoading(false);
    }
  }

  return { error, success, loading, logout }
}

export default useSignout
