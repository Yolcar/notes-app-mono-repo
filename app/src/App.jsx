import { useEffect, useState } from 'react'
import './App.css'
import noteService from './services/notes'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Note from './components/Note'
import NoteForm from './components/NoteForm'
// import LogRocket from 'logrocket'
// LogRocket.init('n8g2k1/appnotes')

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote).then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(() => {
        setErrorMessage(
        `Note '${note.content}' was already deleted from server`
        )
      })
  }

  const addNote = (noteObject) => {
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {
        user
          ? <NoteForm
              addNote={addNote}
              handleLogout={handleLogout}
          />
          : <LoginForm setUser={setUser} setErrorMessage={setErrorMessage}/>
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
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
    </div>
  )
}

export default App
