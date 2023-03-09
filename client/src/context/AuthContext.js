import {createContext, useEffect, useReducer} from 'react'
import { authReducer } from '../reducers/authReducer'

const initState = {
    user: null
}

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initState)

    // update AuthContext using local storage
    useEffect(() => {
        const user = localStorage.getItem('user')
        if(user) {
            dispatch({type: 'LOGIN', payload: JSON.parse(user)})
        }
    }, [])

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}
