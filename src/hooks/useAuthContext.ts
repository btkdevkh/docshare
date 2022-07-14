import { useContext } from "react"
import { AuthContext } from "../context/auth/AuthContext"

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if(!context) throw Error('Please use useAuthContext hook in AuthContextProvider*')

  return context
}
