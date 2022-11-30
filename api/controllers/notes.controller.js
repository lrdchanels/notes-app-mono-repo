import { Note } from '../models/Note.js'

const getNotes = async (request, response, next) => {
  try {
    const notes = await Note.find({})
    await response.json(notes)
  } catch (error) {
    next(error)
  }
}

const getNote = async (request, response, next) => {
  const { id } = request.params

  try {
    const note = await Note.findById(id)
    response.json(note)
  } catch (error) {
    next(error)
  }
}

const createNote = async (request, response, next) => {
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

  try {
    const savedNote = await noteToInsert.save()
    response.status(201).json(savedNote)
  } catch (error) {
    next(error)
  }
}

const updateNote = (request, response, next) => {
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
}

const deleteNote = async (request, response, next) => {
  const { id } = request.params

  try {
    await Note.findByIdAndDelete(id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
}

export { getNotes, getNote, createNote, updateNote, deleteNote }
