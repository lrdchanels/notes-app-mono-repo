import { Router } from 'express'
import { getNotes, getNote, createNote, updateNote, deleteNote } from '../controllers/notes.controller.js'

const notesRouter = Router()

notesRouter.get('/', getNotes)

notesRouter.get('/:id', getNote)

notesRouter.post('/', createNote)

notesRouter.put('/:id', updateNote)

notesRouter.delete('/:id', deleteNote)

export { notesRouter }
