import { auth, store, storage } from '../firebase/db';
import { doc, setDoc } from 'firebase/firestore';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

const useSignup = () => {
  const { dispatch } = useAuthContext()

  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const signup = async (email: string, password: string, displayName: string, thumbnail: File) => {    
    setError(null)
    setSuccess(false)
    setLoading(true)

    try {
      if(!email || !password) {        
        setError('Please fill all fields')
        return
      }

      const res = await createUserWithEmailAndPassword(auth, email, password)

      if(!res) throw new Error('Could not complete the signup')

      // upload user thumbnail
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
      const refStorage = ref(storage, uploadPath)
      
      await uploadBytes(refStorage, thumbnail)
      const imgUrl = await getDownloadURL(refStorage)

      await updateProfile(res.user, { displayName, photoURL: imgUrl })

      // create user documents with custom ID of user uid
      await setDoc(doc(store, 'users', res.user.uid), {
        online: true,
        displayName,
        photoURL: imgUrl
      })

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

  return { error, success, loading, signup }
}

export default useSignup;
