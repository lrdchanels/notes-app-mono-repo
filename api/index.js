import 'dotenv/config.js'
import './mongo.js'

import express from 'express'
import cors from 'cors'

import { Note } from './models/Note.js'
import { notFound } from './middleware/notFound.js'
import { handleErrors } from './middleware/handleErrors.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/images', express.static('./images'))

app.get('/', (request, response) => {
  response.send('<h1>Hello Wold</h1>')
})

app.get('/api/notes', (request, response, next) => {
  Note.find({})
    .then(notes => {
      response.json(notes)
    })
    .catch(next)
})

app.post('/api/notes', async (request, response, next) => {
  const note = request.body

  if (!note || !note.content) {
    return response.status(400).json({
      error: 'note is missing'
    })
  }

  const noteToInsert = new Note({
    content: note.content,
    date: new Date(),
    important: note.important ?? false
  })

  noteToInsert.save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(next)
})

app.get('/api/notes/:id', (request, response, next) => {
  const { id } = request.params

  Note.findById(id)
    .then(note => {
      response.json(note)
    })
    .catch(next)
})

app.delete('/api/notes/:id', (request, response, next) => {
  const { id } = request.params

  Note.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end()
    })
    .catch(next)
})

app.put('/api/notes/:id', (request, response, next) => {
  const { id } = request.params
  const note = request.body

  const newNoteInfo = {
    content: note.content,
    important: note.important
  }

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then(note => {
      response.status(200).json(note)
    })
    .catch(next)
})

app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
