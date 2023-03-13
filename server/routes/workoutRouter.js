const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')
const {
    getWorkouts,
    createWorkout,
    // updateWorkout,
    deleteWorkout
} = require('../controllers/workoutController')

// middleware
router.use(requireAuth)

// routes
router.get('/', getWorkouts)
router.post('/', createWorkout)
// router.patch('/:id', updateWorkout)
router.delete('/:id', deleteWorkout)

module.exports = router
