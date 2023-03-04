import { useState } from 'react'
import Note from './components/Note'
import NoteForm from './components/NoteForm'
import { useUser } from './hooks/useUser'
import { useNotes } from './hooks/useNotes'

const Notes = ({ setErrorMessage }) => {
  const [showAll, setShowAll] = useState(true)
  const { user } = useUser()
  const { notes, toggleImportanceOf, addNote } = useNotes()

  const toggleImportanceOfHandler = id => {
    toggleImportanceOf(id)
      .catch(() => {
        setErrorMessage(
          'Note was already deleted from server'
        )
      })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>

      {
        user
          ? <div>
            <NoteForm addNote={addNote} />
          </div>
          : null
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note, i) =>
          <Note
            key={i}
            note={note}
            toggleImportance={() => toggleImportanceOfHandler(note.id)}
          />
        )}
      </ul>
    </div>
  )
}

export default Notes
