import { formatDistanceToNow } from 'date-fns'

const WorkoutDetails = ({workout, handleDelete}) => {
    const { _id, title, reps, load, createdAt } = workout

    return(
            <div className="workout-card">
                <div className="content">
                    <h4>{title}</h4>
                    <p><strong>Reps: </strong>{reps}</p>
                    <p><strong>Load (kg): </strong>{load}</p>
                    <p className='date'>
                        {formatDistanceToNow(new Date(createdAt), {addSuffix: true})}
                    </p>
                </div>
                <button
                    onClick={() => handleDelete(_id)}
                >
                    <i className='fa-solid fa-trash-can'></i>
                </button>
            </div>
    )
}

export default WorkoutDetails
