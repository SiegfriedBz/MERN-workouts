import { useContext} from "react";
import { WorkoutContext } from '../context/WorkoutContext'

export const useWorkoutContext = () => {
    const context = useContext(WorkoutContext)
    if(!context) {
        throw Error({error: 'useWorkoutContext must es used inside WorkoutContextPfrovider'})
    }

    return context
}
