module.exports = (req, res, next) => {

    
    const getTokenFromHeader = req => {
        const authorization = req.get('authorization')
    
        if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
            return authorization.substring(7)
        }
    
        return null
    }

    const token = getTokenFromHeader(req)
    req.token = token
    next()
}