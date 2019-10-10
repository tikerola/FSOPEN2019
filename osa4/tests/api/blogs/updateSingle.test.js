const supertest = require('supertest')
const app = require('../../../app')
const Blog = require('../../../models/blog')
const mongoose = require('mongoose')
const helper = require('../../../utils/api_test_helper')

const api = supertest(app)

describe('updating single blog with an id', () => {

    beforeEach( async () => {
        await Blog.deleteMany({})

        for (let obj of helper.blogs) {
            const blog = new Blog(obj)
            await blog.save()
        }
    })

    test('updating single blog', async () => {
        let responseAll = await api.get('/api/blogs')

        const id = responseAll.body[0].id

        const responseSingle = await api
        .put(`/api/blogs/${id}`)
        .send({
            title: "Seppo Kääriäisen tupakat",
            author: "Matti, Matista ja Teposta",
            url: "www.missaseppo.lul",
            likes: 2
        })
        expect(responseSingle.body.title).toEqual("Seppo Kääriäisen tupakat")

        responseAll = await api.get('/api/blogs')

        expect(responseAll.body[0].author).toEqual("Matti, Matista ja Teposta")
    })


    afterAll(() => {
        mongoose.connection.close()
    })

})
