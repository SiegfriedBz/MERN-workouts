import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

import { USER_URI } from "../config";

export const useAuthHook = () => {
    const { dispatch }= useAuthContext()

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const login = async(userInput) => {
        setIsLoading(true)
        setError(null)
        try{
            const response = await fetch(`${USER_URI}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInput)
            })
            if (response.ok) {
                const data = await response.json()
                dispatch({
                    type: 'LOGIN',
                    payload: data
                })
                setIsLoading(false)
            }
        } catch(error){
            console.error(error)
        }
    }

    const signup = async(userInput) => {
        setIsLoading(true)
        setError(null)
        try{
            const response = await fetch(`${USER_URI}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInput)
            })
            const data = await response.json()

            if (response.status !== 201) {
                setIsLoading(false)
                setError(data.error)
            } else {
                // save user: { email, token } to local storage
                localStorage.setItem("user", JSON.stringify(data))
                // update Auth Context state
                dispatch({ type: 'LOGIN', payload: data })
                setIsLoading(false)
            }
        } catch(error){
            console.error(error)
        }
    }

    const logOut = () => {
        localStorage.removeItem("user")
        // update Auth Context state
        dispatch({ type: 'LOGOUT' })
    }

    return { login, signup, logOut, error, isLoading }
}
