import { useState, useContext} from "react";
import {useWorkoutContext} from "./useWorkoutContext";

const SERVER_URI = 'http://localhost:3001/api/workouts'

export const useWorkoutFetch = () => {
    const { workouts, dispatch } = useWorkoutContext()
    const [error, setError] = useState(null)

    const getWorkouts = async () => {
        try{
            const response = await fetch(SERVER_URI)
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
            console.log(error)
        }
    }

    const addWorkout = async (workout) => {
        try{
            const response = await fetch(SERVER_URI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(workout)
            })
            const data = await response.json()
            if(response.status !== 201) {
                setError(data.error)
                return
            }
            setError(null)
            dispatch({
                type: 'CREATE_WORKOUT',
                payload: data
            })
        } catch(error) {
            console.log(error)
        }
    }

    const deleteWorkout = async (_id) => {
        try{
            const response = await fetch(`${SERVER_URI}/${_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(response.status === 200) {
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

    return [ workouts, error, getWorkouts, addWorkout, deleteWorkout ]
}



