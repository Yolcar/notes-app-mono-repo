import { useRef, useState } from 'react'
import Togglable from './Togglable'

export default function NoteForm ({ addNote, handleLogout }) {
  const [newNote, setNewNote] = useState('')
  const togglableRef = useRef()
  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    }

    addNote(noteObject)
    setNewNote('')
    togglableRef.current.toggleVisibility()
  }

  return (
    <Togglable buttonLabel='New Note' ref={togglableRef} >
        <div>
            <h3>Create a new note</h3>

        <form onSubmit={handleSubmit}>
            <input
            placeholder='Write a note...'
            value={newNote}
            onChange={handleChange}
            />
            <button type='submit'>save</button>
        </form>
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
        </div>
    </Togglable>
  )
}
