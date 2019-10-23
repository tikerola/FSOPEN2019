
const errorHandler = (error, req, res, next) => {
    if (error.name === 'ValidationError') {
        res.status(400).send({ error: validationError})
    }
    
    if (error.name === 'JsonWebTokenError') {
        res.status(401).send('Invalid token')
    }

    if (error.includes('Password too short')) {
        res.status(400).send(error)
    }

    if (error.includes('is shorter than')) {
        res.status(400).json('username shorter than 3 characters')
    }

    if (error.includes('`username` to be unique')) {
        res.status(400).send({ error: 'username must be unique'})
    }
    
    
    
    next(error)
}

module.exports = errorHandler