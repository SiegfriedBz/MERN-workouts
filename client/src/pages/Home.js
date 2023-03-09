import { useEffect } from "react";
import { useWorkoutFetch } from '../hooks/useWorkoutFetch'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
    const [
        workouts,
        error,
        missingFields,
        getWorkouts,
        addWorkout,
        deleteWorkout
    ] = useWorkoutFetch()

    useEffect(() => {
        (async() => {
           await getWorkouts()
        })()
    }, [])

    return(
        <div className="home">
            <div className="workouts">
                {workouts &&
                    workouts.map((workout) => {
                        return (<WorkoutDetails
                                    key={workout._id}
                                    workout={workout}
                                    handleDelete={deleteWorkout}
                                />)
                    })
                }
            </div>
            <WorkoutForm
                addWorkout={addWorkout}
                error={error}
                missingFields={missingFields}
            />
        </div>
    )
}

export default Home
