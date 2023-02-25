const app = require('../app')
const request = require('supertest')
const Note = require('../models/Note')
const User = require('../models/User')

const api = request(app)

const initialNotes = [
  new Note({
    content: 'Aprendiento FullStacj JS con midudev',
    important: true,
    date: new Date()
  }),
  new Note({
    content: 'Notas Numero 2',
    important: true,
    date: new Date()
  })
]

const getAllcontentFromNotes = async () => {
  const response = await api.get('/api/notes')
  return {
    contents: response.body.map(note => note.content),
    response
  }
}

const getUser = async (request, response) => {
  const userDB = await User.find({})
  return userDB.map(user => user.toJSON())
}

module.exports = { initialNotes, api, getAllcontentFromNotes, getUser }
