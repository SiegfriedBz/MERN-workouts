const mongoose = require('mongoose')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

const signUp = async (req, res) => {
    const { email, password } = req.body

    try{
        const user = await User.signupUser(email, password)
        const token = createToken(user._id)
        res.status(201).json({email, token})
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

const logIn = async (req, res) => {
    // NB: if user has an active jwt token, user is already logged in.
    const { email, password } = req.body

    try{
        const user = await User.loginUser(email, password)
        if(user) {
            const token = createToken(user._id)
            res.status(200).json({email, token})
        }
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {  signUp,  logIn }
