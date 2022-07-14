import { addDoc, collection, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useState } from 'react';
import { store, storage } from '../firebase/db'
import { uploadBytes, ref, getDownloadURL, deleteObject } from 'firebase/storage';
import { IDocShare } from '../models/DocShare';
import { useAuthContext } from './useAuthContext';

const useDocument = (c: string) => {
  const { user } = useAuthContext()

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const colRef = collection(store, c)

  const addDocument = async (document: IDocShare, docFile: File) => {
    const { title, category } = document

    setError(null)
    setSuccess(false)
    setLoading(true)

    try {
      if(!title || !category) {
        setError('Please fill all fields')
        return
      }

      // upload user documents
      const uploadPath = `documents/${user?.uid}/${docFile.name}`
      const refStorage = ref(storage, uploadPath)

      await uploadBytes(refStorage, docFile)
      const docUrl = await getDownloadURL(refStorage)

      const res = await addDoc(colRef, { ...document, docUrl })
      if(!res) throw new Error('Could not complete adding document')

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

  const updateDocument = async (id: string, document: IDocShare) => {
    const { title, category } = document

    setError(null)
    setSuccess(false)
    setLoading(true)

    try {
      if(!title || !category) {
        setError('Please fill all fields')
        return
      }

      if(!id) {
        setError('No ID of deocument exists')
        return
      }

      let docRef = doc(store, c, id)

      await updateDoc(docRef, { ...document })

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

  const deleteDocument = async (id: string, filePath: string) => {
    let docRef = doc(store, c, id)
    let storageRef = ref(storage, filePath)

    await deleteObject(storageRef)
    await deleteDoc(docRef)
  }

  return { error, loading, success, addDocument, updateDocument, deleteDocument }
}

export default useDocument
