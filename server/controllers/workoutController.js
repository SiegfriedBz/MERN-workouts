const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

const getWorkouts = async (req, res) => {
    // get userId from requireAuth middleware
    const user_id = req.user_id

    try{
        const workouts = await Workout
            .find({ user_id })
            .sort({ createdAt: -1 })
        res.status(200).json(workouts)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body
    // get userId from requireAuth middleware
    const user_id = req.user_id

    try{
        const newWorkout = await Workout.create({ user_id, title, reps, load })
        res.status(201).json(newWorkout)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

// const updateWorkout = async (req, res) => {
//     const { body, params: { id } } = req
//     if(!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({error: 'No such workout'})
//     }
//     try{
//         const workout = await Workout.findOneAndUpdate(
//             {_id: id},
//             {...body},
//             {new: true}
//         )
//         if(!workout) {
//             return res.status(404).json({error: 'No such workout'})
//         }
//         return res.status(201).json(workout)
//     } catch(error) {
//         res.status(400).json({error: error.message})
//     }
// }

const deleteWorkout = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }
        try{
            const workout = await Workout.findOneAndDelete(
                { _id: id },
                { returnDocument: 'after' }
            )
            if(!workout) {
                return res.status(400).json({error: 'No such workout'})
            }
            res.status(200).json(workout)
        } catch(error) {
            res.status(400).json({error: error.message})
        }
}

module.exports = {
    getWorkouts,
    createWorkout,
    // updateWorkout,
    deleteWorkout
}
