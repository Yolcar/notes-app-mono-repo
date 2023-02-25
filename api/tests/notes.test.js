const mongoose = require('mongoose')

const Note = require('../models/Note')
const { initialNotes, api, getAllcontentFromNotes } = require('./helpers')
require('dotenv').config()

// beforeAll(async () => {
//   mongoose.set('strictQuery', false)
//   await mongoose.connect(process.env.MONGO_DB_URI_TEST)

//   mongoose.connection.close()
// })

// afterAll(async () => {
//   await mongoose.connect(process.env.MONGO_DB_URI_TEST)
//   await mongoose.connection.dropDatabase()
//   await mongoose.connection.close()
// })

/* Connecting to the database before each test. */
beforeEach(async () => {
  mongoose.set('strictQuery', false)
  await mongoose.connect(process.env.MONGO_DB_URI_TEST)
  await Note.deleteMany({})
  await Note.insertMany(initialNotes)
})

/* Closing connection after each test. */
afterEach(async () => {
  await mongoose.connection.close()
})

/* Testing the API endpoints. */
describe('/api/notes', () => {
  it('should return all notes', async () => {
    await api.get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  it('should return all notes and have legth equal to 2', async () => {
    const res = await api.get('/api/notes')
    expect(res.body).toHaveLength(initialNotes.length)
  })

  it('should return all notes and second note is \'Notas Numero 2\'', async () => {
    const { contents } = await getAllcontentFromNotes()
    expect(contents).toContain('Notas Numero 2')
  })

  it('should return a note', async () => {
    const { response } = await getAllcontentFromNotes()
    const noteToGet = response.body[1]
    const res = await api.get(`/api/notes/${noteToGet.id}`)
    expect(res.statusCode).toBe(200)
    expect(res.body.content).toBe('Notas Numero 2')
  })

  it('should create a note', async () => {
    const newNote = {
      content: 'Mi segunda nota',
      important: true
    }
    await api.post('/api/notes')
      .send(newNote)
      .expect(200)

    const { contents } = await getAllcontentFromNotes()
    expect(contents).toContain(newNote.content)
    expect(contents).toHaveLength(initialNotes.length + 1)
  })

  it('should not added note without content', async () => {
    const res = await api.post('/api/notes').send({
      important: true
    })
    expect(res.statusCode).toBe(400)
  })

  it('should update a note', async () => {
    const { response } = await getAllcontentFromNotes()

    const noteToUpdate = response.body[0]
    const res = await api.put(`/api/notes/${noteToUpdate.id}`)
      .send({
        content: 'Nuevo Contenido para Youtube',
        important: false
      })
    expect(res.statusCode).toBe(200)

    const { contents } = await getAllcontentFromNotes()
    expect(contents).toContain('Nuevo Contenido para Youtube')
    expect(contents).not.toContain(noteToUpdate.content)
  })

  it('should delete a note', async () => {
    const { response } = await getAllcontentFromNotes()

    const noteToDelete = response.body[0]

    const res = await api.delete(`/api/notes/${noteToDelete.id}`)
    expect(res.statusCode).toBe(204)

    const { contents } = await getAllcontentFromNotes()
    expect(contents).not.toContain(noteToDelete.content)
    expect(contents).toHaveLength(initialNotes.length - 1)
  })
})
