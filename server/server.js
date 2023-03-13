const { PORT, MONGO_URI } = require('./utils/config')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const workoutRouter = require('./routes/workoutRouter')
const userRouter = require('./routes/userRouter')

// express app
const app = express()

// middleware
app.use(express.json()) // required for req.body
app.use(cors())
app.use((req, res, next) => {
    console.log('---------')
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/user', userRouter)
app.use(('/api/workouts'), workoutRouter)

// connect to db & listen to requests
const dbConnect = async () => {
    try{
        console.log('connecting to db...')
        await mongoose.connect(MONGO_URI)
        app.listen(PORT, () => {
            console.log(`connected to db & listening to ${PORT}`)
        })
    } catch(error) {
        console.log(error)
    }

}
dbConnect()

module.exports = app
