const supertest = require('supertest')
const app = require('../../../app')
const Blog = require('../../../models/blog')
const mongoose = require('mongoose')
const helper = require('../../../utils/api_test_helper')

const api = supertest(app)

describe('testing deleting single blog with an id', () => {

    beforeEach( async () => {
        await Blog.deleteMany({})

        for (let obj of helper.blogs) {
            const blog = new Blog(obj)
            await blog.save()
        }
    })

    test('deleting single blog', async () => {
        // let responseAll = await api.get('/api/blogs')

        // const id = responseAll.body[0].id

        // await api.delete(`/api/blogs/${id}`)
        // responseAll = await api.get('/api/blogs')

        // expect(responseAll.body.length).toEqual(helper.blogs.length - 1)
    })


    afterAll(() => {
        mongoose.connection.close()
    })

})
