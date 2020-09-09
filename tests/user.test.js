const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOne, userOneId, setupDB } = require('./fixtures/db')

beforeEach(setupDB)

test('Should signup a new user', async() => {
    const response = await request(app)
    .post('/users')
    .send({
        name: 'Arijit',
        email: 'arijit@example.com',
        password: 'bypass777!'
    })
    .expect(201)

    //Assert that the database was changed successfully
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //Assertions bout the response body
    expect(response.body).toMatchObject({
       user: {
           name: 'Arijit',
           email: 'arijit@example.com'
       },
       token: user.tokens[0].token
    })

    expect(user.password).not.toBe(response.body.password)
})

test('Should login existing User', async () => {
    const response = await request(app)
    .post('/users/login')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        email: userOne.email,
        password: userOne.password
    })
    .expect(200)

    const user = await User.findById(userOneId)

    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login non-existing User', async () => {
    const email = userOne.email + 'ds'
    await request(app)
    .post('/users/login')
    .send({
        email: email,
        password: userOne.password
    }).expect(400)
})

test('Shoulg get profile for user', async ()=> {
    await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Shoulg not get profile for not authenticated user', async ()=> {
    await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test('Should delete account for user',async () => {
    await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete account for not authenticated user',async () => {
     await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})

test('Should upload avatar image', async() => {
    await request(app).post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/profile-pic.jpg')
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

// test('Should update the name of the user', async () => {
//     await request(app)
//     .patch('users/me/')
//     .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//     .send({
//         name: 'Jess',
//         email: 'jess@example.com'
//     })
//     .expect(200)

//     const user = await User.findById(userOneId)
//     expect(user.name).toBe('Jess')
// })

// test('Should update the name of the user', async () => {
//         await request(app)
//         .patch('users/me/')
//         .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//         .send({
//             location: 'Phili',
//             email: 'jess@example.com'
//         })
//         .expect(400)
// })