import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { USER_URI } from '../config'

export const useAuth = () => {
    const { dispatch } = useAuthContext()

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const auth = async (userInput, path) => {
        const response = await fetch(`${USER_URI}/${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInput)
        })
        if (response.status === 200 || response.status === 201) {
            const data = await response.json()
            // save user: { email, token } to local storage
            localStorage.setItem("user", JSON.stringify(data))
            // update Auth Context state
            dispatch({
                type: 'LOGIN',
                payload: data
            })
            setIsLoading(false)
        }
    }

    const signup = async (userInput) => {
        setIsLoading(true)
        setError(null)
        try{
            await auth(userInput, 'signup')
        } catch(error){
            console.error(error)
        }
    }

    const login = async (userInput) => {
        setIsLoading(true)
        setError(null)
        try{
            await auth(userInput, 'login')
        } catch(error){
            console.error(error)
        }
    }

    const logOut = () => {
        // remove user: { email, token } from local storage
        localStorage.removeItem("user")
        // update Auth Context state
        dispatch({ type: 'LOGOUT' })
    }

    return { login, signup, logOut, error, isLoading }
}
