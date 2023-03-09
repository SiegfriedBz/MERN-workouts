const express = require('express')
const router = express.Router()
const {
    getWorkouts,
    createWorkout,
    // updateWorkout,
    deleteWorkout
} = require('../controllers/workoutController')

router.get('/', getWorkouts)
router.post('/', createWorkout)
// router.patch('/:id', updateWorkout)
router.delete('/:id', deleteWorkout)

module.exports = router
