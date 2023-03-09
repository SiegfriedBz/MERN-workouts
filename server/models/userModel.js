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

userSchema.statics.signup = async function(email, password) {

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

    const exists = await this.findOne({ email })
    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({ email, password: hash })

    return user
}

userSchema.statics.login = async function(email, password) {
    const exists = await this.findOne({ email })
    if (!exists) {
        throw Error('Email does not, please signup')
    }

}

module.exports = mongoose.model("User", userSchema)
