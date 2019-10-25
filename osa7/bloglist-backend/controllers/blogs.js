
const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



router.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
})

router.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    res.json(blog)
})

router.post('/', async (request, response, next) => {
    const { title, author, url, likes } = request.body

    try {
        const decoded = jwt.verify(request.token, process.env.SECRET)

        if (!request.token || !decoded.id) {
            response.status(401).send('Token missing or invalid')
        }

        const user = await User.findById(decoded.id)

        const blog = new Blog({
            title,
            author,
            url,
            likes,
            user: user._id
        })


        const result = await blog.save()
        user.blogs = user.blogs.concat(result._id)
        await user.save()
        
        const returnedBlog = await Blog.findById(result._id).populate('user')

        response.status(201).json(returnedBlog.toJSON())
    } catch (error) {
        next(error)
    }

})

router.post('/:id/comments', async (req, res, next) => {
 
    const { comment } = req.body
    

    try {
        const blog = await Blog.findById(req.params.id)

        blog.comments = blog.comments.concat(comment)
        const savedBlog = await blog.save()

        const blogToReturn = await Blog.findById(savedBlog._id).populate('user')

        res.status(201).send(blogToReturn)
    }
    catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {

    try {

        const decoded = jwt.verify(req.token, process.env.SECRET)

        if (!req.token || !decoded.id) {
            res.status(401).send('Token missing or invalid')
        }

        const user = await User.findById(decoded.id)
        
        user.blogs = user.blogs.filter(id => {
            return id.toString() !== req.params.id
        })
        
        await user.save()

        await Blog.findByIdAndRemove(req.params.id, {
            useFindAndModify: false
        })
        res.status(204).end()
    } catch (error) {
        next(error)
    }
})

router.patch('/:id', async (req, res, next) => {

    const likes = req.body.likes

    try {
        const result = await Blog.findByIdAndUpdate(req.params.id, { likes }, {
            new: true,
            useFindAndModify: false
        }).populate('user')
        res.json(result)
    } catch (error) {
        next(error)
    }
})

module.exports = router