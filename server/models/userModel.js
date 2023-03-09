const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required:true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// static method signup
userSchema.statics.signupUser = async function(email, password) {
    // validation
    if(!email || !password) {
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)) {
        throw Error('Please use a valid email')
    }
    if(!validator.isStrongPassword(password)) {
        throw Error('Please use a strong password')
    }

    // check if email stored in db
    const exists = await this.findOne({ email })
    if (exists) {
        throw Error('Email already in use')
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({ email, password: hash })

    return user
}

// static method login
userSchema.statics.loginUser = async function(email, password) {
    // validation
    if(!email || !password) {
        throw Error('All fields must be filled')
    }

    // check if email stored in db
    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Email does not exist')
    }

    // check password
    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error('Password does not match')
    }

    return user
}

module.exports = mongoose.model("User", userSchema)
