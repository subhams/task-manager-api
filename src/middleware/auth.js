const jwt = require('jsonwebtoken')
const User = require('../models/user')
const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById({_id: decoded._id, 'tokens.token': token})
        if(!user){
            throw new Error()
        }
        req.user = user
        req.token = token
        
        next()
    }catch (e){
        res.send(401).send('Please authenticate')
    }
}

module.exports = auth