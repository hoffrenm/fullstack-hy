const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('../utils/test_helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const existingUser = new User({
    name: 'Api User',
    username: 'test1',
    password: 'wasspord'
  })
  await existingUser.save()
})

describe('POST', () => {
  test('user can be created with valid data', async () => {
    const users = await helper.usersInDB()
    const newUser = { name: 'Api Test', username: 'test', password: 'secret' }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDB()

    expect(response.body.id).toBeDefined()
    expect(response.body.passwordHash).not.toBeDefined()
    expect(usersAtEnd.length).toBe(users.length + 1)
  })

  test('password under 3 digits is rejected', async () => {
    const users = await helper.usersInDB()
    const newUser = { name: 'Api Test', username: 'test', password: 'ab' }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDB()

    expect(response.body.error).toBeDefined()
    expect(response.body.error).toContain('password must be 3 digits or longer')
    expect(usersAtEnd.length).toBe(users.length)
  })

  test('username under 3 digits is rejected', async () => {
    const users = await helper.usersInDB()
    const newUser = { name: 'Api Test', username: 't', password: 'secret' }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDB()

    console.log(response.body.error)

    expect(response.body.error).toBeDefined()
    expect(response.body.error).toContain('username must be 3 digits or longer')
    expect(usersAtEnd.length).toBe(users.length)
  })

  test('duplicate username cannot be created', async () => {
    const users = await helper.usersInDB()
    const newUser = { name: 'Api Test', username: 'test1', password: 'secret' }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDB()

    expect(response.body.error).toBeDefined()
    expect(response.body.error).toContain('expected `username` to be unique')
    expect(usersAtEnd.length).toBe(users.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
