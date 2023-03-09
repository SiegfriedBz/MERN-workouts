const mongoose = require('mongoose')
const User = require('../models/userModel')

const logIn = async (req, res) => {
    const { body } = req
    res.status(201).json({"msg": 'login user'})
    // try{
    //     const user = await User.create({email: body.email, password: body.password})
    //     if(user) {
    //         res.status(201).json(user)
    //     }
    // } catch(error) {
    //     res.status(400).json(error)
    // }
}

const signUp = async (req, res) => {
    const { email, password } = req.body
    try{
        const user = await User.signup(email, password)
        res.status(201).json({email, user})
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {  logIn, signUp }
