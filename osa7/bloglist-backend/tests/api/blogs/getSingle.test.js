const supertest = require('supertest')
const app = require('../../../app')
const Blog = require('../../../models/blog')
const mongoose = require('mongoose')
const helper = require('../../../utils/api_test_helper')

const api = supertest(app)

describe('testing getting single blog with an id', () => {

    beforeEach( async () => {
        await Blog.deleteMany({})

        for (let obj of helper.blogs) {
            const blog = new Blog(obj)
            await blog.save()
        }
    })

    test('getting single blog', async () => {
        const responseAll = await api.get('/api/blogs')

        const id = responseAll.body[0].id

        const responseSingle = await api.get(`/api/blogs/${id}`)
        expect(responseSingle.body.title).toEqual(helper.blogs[0].title)
    })


    afterAll(() => {
        mongoose.connection.close()
    })

})
