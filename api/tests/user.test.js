const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = require('../models/User')
const { api, getUser } = require('./helpers')
require('dotenv').config()

/* Connecting to the database before each test. */
beforeEach(async () => {
  mongoose.set('strictQuery', false)
  await mongoose.connect(process.env.MONGO_DB_URI_TEST)
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('pswd', 10)
  const user = new User({
    username: 'xYolcar',
    passwordHash,
    name: 'User Test'
  })
  await user.save()
})

/* Dropping the database and closing connection after each test. */
afterEach(async () => {
  await mongoose.connection.close()
})

describe('/api/notes', () => {
  it('should return all users', async () => {
    await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  it('should return all users and have legth equal to 2', async () => {
    const res = await api.get('/api/users')
    expect(res.body).toHaveLength(1)
  })

  it('should create a user', async () => {
    const userAtStart = await getUser()

    const newUser = {
      username: ' Yuli',
      name: 'Yuliandry',
      password: 'miClave'
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await getUser()

    expect(usersAtEnd).toHaveLength(userAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  it('should fails with proper statuscode and message if username is already taken', async () => {
    const userAtStart = await getUser()
    const newUser = {
      username: 'xYolcar',
      password: 'contraseña',
      name: 'User Test Failt'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.errors.username.message).toContain('`username` to be unique')
    const usersAtEnd = await getUser()
    expect(usersAtEnd).toHaveLength(userAtStart.length)
  })
})
