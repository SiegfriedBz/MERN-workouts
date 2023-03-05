require('dotenv').config()
const express = require('express')
const workoutRouter = require('./routes/workouts')
const app = express()

// middleware
app.use(express.json()) // required for req.body
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use(('/api/workouts'), workoutRouter)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`listening to ${PORT}`)
})
