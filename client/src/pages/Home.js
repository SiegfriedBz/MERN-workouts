import { useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useWorkout } from '../hooks/useWorkout'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
    const { user } = useAuthContext()
    const { workouts, error, missingFields, getWorkouts, addWorkout, deleteWorkout } = useWorkout()

    useEffect(() => {
        (async() => {
            if(user) {
                await getWorkouts()
            }
        })()
    }, [user])

    return(
        <>
            {error && <div className="error">{error}</div>}
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
                    missingFields={missingFields}
                />
            </div>
        </>
    )
}

export default Home
