import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if(!context) {
        throw Error({error: 'AuthContext must be used inside AuthContextProvider'})
    }

    return context
}
