import { createContext, useReducer } from 'react'
import { workoutReducer } from '../reducers/workoutReducer'

const initState = {
    workouts: []
}

export const WorkoutContext = createContext()

export const WorkoutContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(workoutReducer, initState)

    return (
        <WorkoutContext.Provider value={{...state, dispatch}}>
            { children }
        </WorkoutContext.Provider>
    )
}
