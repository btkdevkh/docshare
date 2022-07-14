import React, { ReactNode, useEffect, useReducer } from 'react'
import { createContext } from 'react'
import { auth } from '../../firebase/db';
import { onAuthStateChanged, User } from 'firebase/auth';
import { authReducer } from './authReducer';

type Props = {
  children: ReactNode
}

interface UserContext {
  user: User | null;
  authIsReady: boolean;
  dispatch: Function;
}

export const AuthContext = createContext<UserContext | null>(null)

export function AuthContextProvider({ children }: Props) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false
  })

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      dispatch({ type: 'AUTH_IS_READY', payload: user })
      unsub()
    })    
  }, [])

  // console.log('AuthContext state', state);
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
