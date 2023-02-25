const notesRouter = require('express').Router()
const userExtractor = require('../middleware/userExtractor')
const Note = require('../models/Note')
const User = require('../models/User')

notesRouter.get('/', async (req, res, next) => {
  try {
    const notes = await Note.find({}).populate('user', {
      username: 1,
      name: 1
    })
    res.json(notes)
  } catch (err) {
    next(err)
  }
})

notesRouter.get('/:id', userExtractor, (req, res, next) => {
  const { id } = req.params
  Note.findById(id)
    .then(note => {
      if (note) {
        res.json(note)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => {
      next(err)
    })
})

notesRouter.put('/:id', userExtractor, (req, res, next) => {
  const { id } = req.params
  const newNote = {
    content: req.body.content,
    important: req.body.important
  }

  Note.findByIdAndUpdate(id, newNote, { returnDocument: 'after' })
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      next(err)
    })
})

notesRouter.delete('/:id', userExtractor, (req, res, next) => {
  const { id } = req.params
  Note.findByIdAndDelete(id)
    .then(result => {})
    .catch(err => {
      next(err)
    })

  res.status(204).end()
})

notesRouter.post('/', userExtractor, async (req, res, next) => {
  const { content, important = false } = req.body

  // sacar userId de request
  const { userId } = req

  if (!content) {
    return res.status(400).json({
      error: 'note.content is missing'
    })
  }

  const user = await User.findById(userId)

  if (!user) {
    return res.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const newNote = Note({
    content,
    important,
    date: new Date().toISOString(),
    user: userId
  })

  try {
    const savedNote = await newNote.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()
    res.json(savedNote)
  } catch (error) {
    next(error)
  }
})

module.exports = notesRouter
