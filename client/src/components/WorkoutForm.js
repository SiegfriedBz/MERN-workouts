import { useState } from "react";
const initWorkout = {title: '', reps: '', load: ''}

const WorkoutForm = ({addWorkout, error}) => {
    const [workout, setWorkout] = useState(initWorkout)

    const handleChange = (e) => {
        let { name, value } = e.target
        value = name === 'title' ? value : Number(value)
        setWorkout({...workout, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await addWorkout(workout)
        setWorkout(initWorkout)
    }

    return(
        <form
            className='form-workout'
            onSubmit={handleSubmit}>
            <h1>Add New Workout</h1>
            <label htmlFor="title">Title</label>
            <input
                id='title'
                name='title'
                type="text"
                value={workout.title}
                onChange={handleChange}
            />
            <label htmlFor="reps">Reps</label>
            <input
                id='reps'
                name='reps'
                type="number"
                value={workout.reps}
                onChange={handleChange}
            />
            <label htmlFor="load">Load (kg)</label>
            <input
                id='load'
                name='load'
                type="number"
                value={workout.load}
                onChange={handleChange}
            />
            <button type='submit'>
                Create Workout
            </button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm
