import { useState } from "react";
const initWorkout = {title: '', reps: '', load: ''}

const WorkoutForm = ({ addWorkout, error, missingFields }) => {
    const [workout, setWorkout] = useState(initWorkout)

    const handleChange = (e) => {
        let { name, value } = e.target
        value = name === 'title' ? value : Number(value)
        setWorkout({...workout, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await addWorkout(workout)
        if(response !== null) {
            setWorkout(initWorkout)
        }

    }

    const inputClass = (field) => {
        return missingFields.includes(field) ? 'error' : ''
    }

    return(
        <form
            onSubmit={handleSubmit}>
            <h4>Add a New Workout</h4>
            <label htmlFor="title">Title</label>
            <input
                id='title'
                name='title'
                className={inputClass('title')}
                type="text"
                value={workout.title}
                onChange={handleChange}
            />
            <label htmlFor="reps">Reps</label>
            <input
                id='reps'
                name='reps'
                className={inputClass('reps')}
                type="number"
                value={workout.reps}
                onChange={handleChange}
            />
            <label htmlFor="load">Load (kg)</label>
            <input
                id='load'
                name='load'
                className={inputClass('load')}
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
