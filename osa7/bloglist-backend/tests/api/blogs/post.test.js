const Blog = require('../../../models/blog')
const app = require('../../../app')
const supertest = require('supertest')
const api = supertest(app)
const mongoose = require('mongoose')
const User = require('../../../models/user')

describe('testing GET /api/blogs', () => {

    let token

    const getToken = async () => {
        const user = await api
            .post('/api/users')
            .send({
                username: 'tatti',
                name: "Jukka Järvinen",
                password: "pyöveli"
            })


        const loginResponse = await api
            .post('/api/login')
            .send({ username: user.body.username, password: 'pyöveli' })

        return loginResponse.body.token
    }

    

    beforeEach(async () => {

        await Blog.deleteMany({})

        await User.deleteMany({})
        token = await getToken()
        

    })

    test('should manage to post a blog', async () => {

        await api
            .post('/api/blogs')
            .set('Authorization', 'bearer ' + token)
            .send({
                title: "Jippikayee, mf!",
                author: "Demi Moore",
                url: "IStillLoveAshton.net",
                likes: 54
            })
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(1)

        expect(response.body[response.body.length - 1].author).toEqual("Demi Moore")
    })

    test('not giving likes --> likes: 0', async () => {
        await api
            .post('/api/blogs')
            .set('Authorization', 'bearer ' + token)
            .send(
                {
                    title: "Jippikayee, mf!",
                    author: "Demi Moore",
                    url: "IStillLoveAshton.net"
                }
            )

        const response = await api.get('/api/blogs')
        expect(response.body[response.body.length - 1].likes).toBe(0)

    })

    test('not giving title & url results status 400', async () => {
        await api
            .post('/api/blogs')
            .set('Authorization', 'bearer ' + token)
            .send(
                {
                    author: "Demi Moore",
                    url: "IStillLoveAshton.net"
                }
            )
            .expect(400)

    })


    afterAll(() => {
        mongoose.connection.close()
    })
})

