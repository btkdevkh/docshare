import { useEffect, useRef, useState } from 'react';
import { store } from '../firebase/db'
import { collection, CollectionReference, DocumentData, onSnapshot, orderBy, query, where } from "firebase/firestore"; 
import { useAuthContext } from './useAuthContext';

const useCollection = (c: string, isQuery: boolean) => {
  const { user } = useAuthContext()

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [documents, setDocuments] = useState<any[] | null>(null)

  let colRef = collection(store, c)
  
  useEffect(() => {
    setLoading(true)

    if(isQuery) {
      colRef = query(
        collection(store, c), 
        where("uid", "==", user?.uid!), 
        orderBy('createdAt', 'desc')
      ) as CollectionReference<DocumentData>
    }
    
    const unsub = onSnapshot(colRef, (snapshot) => { 
      let results: any[] = [];

      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id });
      })

      setDocuments(results)
      setError(null)
      setLoading(false)
      setSuccess(true)
    }, (err: any) => {
      console.log(err.message)
      setError('Could not fetch the data')
      setLoading(false)
      setSuccess(false)
    })

    return () => unsub()
  }, [c, isQuery])

  return { error, loading, success, documents }
}

export default useCollection
