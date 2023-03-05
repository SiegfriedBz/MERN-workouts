const express = require('express')
const router = express.Router()

// index
router.get('/', (req, res) => {
    res.json({msg: 'GET all workouts'})
})

// show
router.get('/:id', (req, res) => {
    const { id } = req.params
    res.json({msg: `GET workout with id ${id}`})
})

// create
router.post('/', (req, res) => {
    const { body } = req
    res.json({msg: `POST workout with body ${body}`})
})

// update
router.patch('/:id', (req, res) => {
    const { body, params: { id } } = req
    res.json({msg: `PATCH workout with id ${id} with body ${body}`})
})

// delete
router.delete('/:id', (req, res) => {
    const { id } = req.params
    res.json({msg: `DELETE workout with id  ${id}`})
})

module.exports = router
