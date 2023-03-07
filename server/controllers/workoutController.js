const Workout = require('../models/workoutModel')

const getWorkouts = (req, res) => {
    const workouts = Workout.find({})
    res.status(200).json(workouts)
}

const getWorkout = (req, res) => {
    const { id } = req.params
    const workout = Workout.findById(id)
    res.status(200).json(workout)
}

const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body
    try{
        const newWorkout = await Workout.create({title, reps, load})
        res.status(200).json(newWorkout)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

const updateWorkout = (req, res) => {
    const { body, params: { id } } = req
    res.json({msg: `PATCH workout with id ${id} with body ${body}`})
}

const deleteWorkout = (req, res) => {
    const { id } = req.params
    res.json({msg: `DELETE workout with id  ${id}`})
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout
}
