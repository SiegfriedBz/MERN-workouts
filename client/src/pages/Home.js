import { useState, useEffect } from "react";
const SERVER_URI = 'http://localhost:3001/api/workouts'

const Home = () => {
    const [workouts, setWorkouts] = useState([])

    useEffect(() => {
        (async() => {
            console.log('useEffect()')
            const response = await fetch(SERVER_URI)
            if(response.ok) {
                const data = await response.json()
                setWorkouts(data)
            }
        })()
    }, [])

    console.log('workouts', workouts)

    return(
        <div className="home">
            <div className="workouts">
                {workouts &&
                    workouts.map((w) => {
                        return <p key={w._id}>{w.title}</p>
                    })
                }
            </div>
        </div>
    )
}

export default Home
