const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

const getWorkouts = async (req, res) => {
    try{
        const workouts = await Workout
            .find({})
            .sort({ createdAt: -1 })
        res.status(200).json(workouts)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

const getWorkout = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: `No such workout`})
    }
    try{
        const workout = await Workout.findById(id)
        if(!workout){
            return res.status(404).json({error: `No such workout`})
        }
        res.status(200).json(workout)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
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

const updateWorkout = async (req, res) => {
    const { body, params: { id } } = req
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }
    try{
        const workout = await Workout.findOneAndUpdate(
            {_id: id},
            {...body},
            {new: true}
        )
        if(!workout) {
            return res.status(404).json({error: 'No such workout'})
        }
        return res.status(201).json(workout)

    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

const deleteWorkout = async (req, res) => {
    const { id } = req.params
    console.log(id)
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }
        try{
            const workout = await Workout.findOneAndDelete({_id: id})
            if(!workout) {
                return res.status(400).json({error: 'No such workout'})
            }
            return res.status(204).json(workout)
        } catch(error) {
            res.status(400).json({error: error.message})
        }
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout
}
