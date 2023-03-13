import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useWorkoutContext } from './useWorkoutContext'
import { WORKOUTS_URI } from '../config'

export const useWorkout = () => {
    const { user } = useAuthContext()
    const { workouts, dispatch } = useWorkoutContext()

    const [missingFields, setMissingFields] = useState([])
    const [error, setError] = useState(null)

    const fetchOptions = (method="GET", payload={}) => {
        const Authorization = user && user.token
            ? {'Authorization': `Bearer ${user.token}`}
            : {}

        const headers = {
            headers:
                {'Content-Type': 'application/json',
                ...Authorization
                }
            }

        let options = {
            method,
            ...headers
        }

        if(method === 'POST') {
            options.body = JSON.stringify(payload)
        }

        return options
    }

    const getWorkouts = async () => {
        if(!user) {
            setError('You must be logged in')
            return
        }
        try{
            const response = await fetch(WORKOUTS_URI, fetchOptions())
            const data = await response.json()
            if(!response.ok) {
                setError(data.error)
                return
            }
            setError(null)
            dispatch({
                type: 'SET_WORKOUTS',
                payload: data
            })
        } catch(error) {
            console.error(error)
        }
    }

    const getMissingFields = (workout) => {
        let missingFields = []
        const requiredFields = ['title', 'reps', 'load']
        requiredFields.forEach(field => {
            if(!workout[field]) {
                missingFields.push(field)
            }
        })
        return missingFields
    }

    const addWorkout = async (workout) => {
        if(!user) {
            setError('You must be logged in')
            return
        }

        let missingFields = getMissingFields(workout)
        if(missingFields.length > 0) {
            setError(`Please fill all the fields`)
            setMissingFields(missingFields)
            return null
        }

        try{
            const response = await fetch(WORKOUTS_URI, fetchOptions('POST', workout))
            const data = await response.json()
            if(response.status === 400) {
                setError(data.error)
                return
            }
            setError(null)
            setMissingFields([])
            dispatch({
                type: 'CREATE_WORKOUT',
                payload: data
            })
        } catch(error) {
            console.error(error)
        }
    }

    const deleteWorkout = async (_id) => {
        if(!user) {
            setError('You must be logged in')
            return
        }
        try{
            const response = await fetch(`${WORKOUTS_URI}/${_id}`, fetchOptions('DELETE'))
            if(response.status === 200) {
                setError(null)
                const data = await response.json()
                dispatch({
                    type: 'DELETE_WORKOUT',
                    payload: data
                })
            } else {
                throw Error('error while deleting')
            }
        } catch(error) {
            console.error(error)
        }
    }

    return { workouts, error, missingFields, getWorkouts, addWorkout, deleteWorkout }
}
