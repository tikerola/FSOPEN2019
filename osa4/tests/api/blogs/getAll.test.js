const Blog = require('../../../models/blog')
const app = require('../../../app')
const supertest = require('supertest')
const api = supertest(app)
const mongoose = require('mongoose')
const helper = require('../../../utils/api_test_helper')

describe('testing GET /api/blogs', () => {

    beforeEach( async () => {
    
        await Blog.deleteMany({})
        
        for (let obj of helper.blogs) {
            const blog = new Blog(obj)
            await blog.save()
        }
    
    })
    
    test('should test connection', async () => {

        await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    })

    test('should find initial blogs', async () => {
        const result = await api.get('/api/blogs')

        expect(result.body.length).toBe(helper.blogs.length)
    })

    test('id, instead of _id, should be defined', async () => {
        const result = await api.get('/api/blogs')

        expect(result.body[0].id).toBeDefined()
        expect(result.body[0]._id).not.toBeDefined()
    })
    
    
    
    afterAll(() => {
        mongoose.connection.close()
    })
})

