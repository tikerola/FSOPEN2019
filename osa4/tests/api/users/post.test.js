const mongoose = require('mongoose')
const User = require('../../../models/user')
const app = require('../../../app')
const supertest = require('supertest')
const api = supertest(app)


describe('testing user creation', () => {

    beforeEach( async () => {
        await User.deleteMany({})

        const user = new User({
            username: 'tiku',
            name: 'taku',
            passwordHash: 'räikkösennarina'
        })

        await user.save()

    })

    test('we can create a user', async () => {
        const usersAtStart = await User.find({})

        const newUser = {
            username: 'tami',
            name: 'tamminen',
            password: 'siirsinvainautoa'
        }

        await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await User.find({})
        

        expect(usersAtEnd.length).toBe(usersAtStart.length + 1)
        const usernames = usersAtEnd.map(users => users.username)

        expect(usernames).toContain(newUser.username)

    })

    test('cant create an existing user', async () =>{

        const newUser = {
            username: 'tiku',
            name: 'tamminen',
            password: 'veneväärälläpaikalla'
        }

        const res = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        expect(res.text).toContain('username must be unique')
    })

    test('username and password must be at least 3 chars', async () => {

        const newUser1 = {
            username: 'OH',
            name: 'Original Hamsta',
            password: 'poskissapähkinöitä'
        }

        const newUser2 = {
            username: 'The real OG',
            name: 'Marko Bjurström',
            password: 'OG'
        }

        const res1 = await api
        .post('/api/users')
        .send(newUser1)
        .expect(400)

        expect(res1.text).toContain('username shorter than 3 characters')

        const res2 = await api
        .post('/api/users')
        .send(newUser2)
        .expect(400)

        
        expect(res2.text).toContain('Password too short')



    })


    afterAll(() => {
        mongoose.connection.close()
    })
})