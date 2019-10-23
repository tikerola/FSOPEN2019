const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.post('/', async (req, res, next) => {
    const { username, name, password, posts } = req.body

    try {

        if (!password || password.length < 3)
            throw new Error('Password too short')

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            username,
            name,
            passwordHash,
            posts
        })

        const savedUser = await user.save()
        res.json(savedUser)

    } catch (err) {
        
        next(err.message)
    }

})

usersRouter.get('/', async (req, res, next) => {
    const users = await User.find({}).populate('blogs')

    res.json(users.map(user => user.toJSON()))
})




module.exports = usersRouter