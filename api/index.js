import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello Wold</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  if (!note || !note.content) {
    return response.status(400).json({
      error: 'note is missing'
    })
  }

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    date: new Date().toISOString(),
    important: note.important ?? false
  }

  notes.push(newNote)

  response.status(201).json(newNote)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)

  if (note) { response.json(note) } else { response.status(404).end() }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

app.put('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = request.body

  const newNoteInfo = {
    content: note.content,
    important: note.important
  }

  notes = notes.map(returnedNote => returnedNote.id !== id ? returnedNote : { ...returnedNote, ...newNoteInfo })

  response.json(notes.find(returnedNote => returnedNote.id === id))
})

app.use((request, response) => {
  // save bad url in database
  // request.path
  response.status(404).json({
    error: 'Not found'
  })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
