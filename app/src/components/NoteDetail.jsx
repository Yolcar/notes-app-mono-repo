import { useParams } from 'react-router-dom'
import { useNotes } from '../hooks/useNotes'

export const NoteDetail = () => {
  const { notes } = useNotes()
  const id = useParams().id
  const note = notes.find(n => n.id === id)

  if (!note) return null
  return (
    <div>
        <h2>
            {note.content}
        </h2>
        <div>
            {note.user.name}
        </div>
        <div>
            <strong>
                {note.important ? 'important' : ''}
            </strong>
        </div>
    </div>
  )
}
