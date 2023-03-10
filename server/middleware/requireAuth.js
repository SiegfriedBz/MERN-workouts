import User from '../models/userModel'
import jwt from 'jsonwebtoken'

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers

    if(!authorization) {
        return res.status(401).json({error: 'Authorization required'})
    }

    try{
        const [_, token] = authorization.split(' ')
        const { _id } = jwt.verify(token, process.env.SECRET)

        const userId = await User.findOne({ _id }).select('_id')

        req.userId = userId

        next()
    } catch(error) {
        console.log(error)
        res.json(401).json({error: 'Request not authorized'})
    }
}

module.exports = requireAuth
