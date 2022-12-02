import { Note } from '../models/Note.js'
import { User } from '../models/User.js'

const getNotes = async (request, response, next) => {
  try {
    const notes = await Note.find({}).populate('user', {
      username: 1,
      name: 1
    })

    await response.json(notes)
  } catch (error) {
    next(error)
  }
}

const getNote = async (request, response, next) => {
  const { id } = request.params

  try {
    const note = await Note.findById(id).populate('user', {
      username: 1,
      name: 1
    })

    response.json(note)
  } catch (error) {
    next(error)
  }
}

const createNote = async (request, response, next) => {
  const {
    content,
    important = false,
    userId
  } = request.body

  if (!content) {
    return response.status(400).json({
      error: 'required "content" field is missing'
    })
  }

  const user = await User.findById(userId)

  const noteToInsert = new Note({
    content,
    date: new Date(),
    important,
    user: user._id
  })

  try {
    const savedNote = await noteToInsert.save()

    user.notes = user.notes.concat(savedNote._id)
    await user.save()

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
