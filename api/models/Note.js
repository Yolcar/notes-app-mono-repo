const { Schema, model } = require('mongoose')

const noteSchema = new Schema({
  content: {
    type: String,
    required: [true, 'Content is required.']
  },
  date: Date,
  important: {
    type: Boolean,
    required: [true, 'Important is required']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = model('Note', noteSchema)
module.exports = Note
