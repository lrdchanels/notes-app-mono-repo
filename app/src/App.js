import { useState, useEffect } from "react"
import { Note } from "./components/Note.js"
import { getAll as getAllNotes, create as createNote, update as updateNote } from './services/notes'

function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')

 useEffect(() => {
    getAllNotes()
      .then(notes => 
        setNotes(notes)
      )
      .catch(e => 
        console.error(e)
      )

  }, []) 

  const handleChange = (e) => {
    setNewNote(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const noteToAddToState = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }

    createNote(noteToAddToState)
      .then(note => 
        setNotes(prevNotes => ([...prevNotes, note]))
      )
      .catch(e => 
        console.error(e)
      )
    
    setNewNote('');
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    updateNote(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(e => 
        console.error(e)
      )
  }

  return (
    <div style={{padding: '0px 20px'}}>
      <h1>Notes</h1>
      <ol>
        {notes.length ? 
          notes.map(note => (
            <Note 
              key={note.id} 
              content={note.content} 
              important={note.important} 
              toggleImportance={() => toggleImportanceOf(note.id)} 
            />
          ))
        : <p>Waiting..</p>
        }
      </ol>

      <form onSubmit={handleSubmit}>
        <input type='text' value={newNote} onChange={handleChange} />
        <button>Create note</button>
      </form>
    </div>
  )
}

export default App;
