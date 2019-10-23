
require('dotenv').config()
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

loginRouter.post('/', async (req, res, next) => {
    const { username, password } = req.body
    

    const user = await User.findOne({ username }) 
    if(!user) {
        console.log('********************', user)
        res.status(401).send('Unauthorized user')
    }
    
    const match = await bcrypt.compare(password, user.passwordHash)

    if (!match) 
        res.status(401).send('Unauthorized user')
    

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    res.status(200).send({
        username: user.username,
        name: user.name,
        token
    })

})

module.exports = loginRouter