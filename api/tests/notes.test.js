import mongoose from 'mongoose'
import { server } from '../index.js'

import { Note } from '../models/Note.js'
import { api } from './helpers/helper.helper.js'
import { initialNotes, getAllNotes } from './helpers/notes.helper.js'

describe('GET', () => {
  it('are returned as json', async () => {
    const response = await api.get('/api/notes')
    expect(response.statusCode).toBe(200)
  })

  it('there are two notes', async () => {
    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(initialNotes.length)
  })

  it('check content the first note', async () => {
    const response = await api.get('/api/notes')
    const contents = response.body.map(note => note.content)
    expect(contents).toContain('Note 1')
  })
})

describe('POST', () => {
  it('a valid note can be added', async () => {
    const newNote = {
      content: 'newNote',
      important: true,
      userId: '63896f04d3f64d1c4176670b'
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const { response, contents } = await getAllNotes()

    expect(response).toHaveLength(initialNotes.length + 1)
    expect(contents).toContain(newNote.content)
  })

  it('without content is not added', async () => {
    const newNote = {
      important: true
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const { response, contents } = await getAllNotes()

    expect(response).toHaveLength(initialNotes.length)
    expect(contents).not.toContain(newNote.content)
  })
})

describe('DELETE', () => {
  it('a note can be deleted', async () => {
    const { response: firstResponse } = await getAllNotes()
    const noteToDelete = firstResponse[0]

    await api
      .delete(`/api/notes/${noteToDelete.id}`)
      .expect(204)

    const { response: secondResponse, contents } = await getAllNotes()
    expect(secondResponse).toHaveLength(initialNotes.length - 1)
    expect(contents).not.toContain(noteToDelete.content)
  })

  it('a note that do not exist can not be deleted', async () => {
    await api
      .delete('/api/notes/noExist')
      .expect(400)

    const { response } = await getAllNotes()
    expect(response).toHaveLength(initialNotes.length)
  })
})

beforeEach(async () => {
  await Note.deleteMany({})

  /*   const notesObjects = initialNotes.map(note => new Note(note))
  const promises = notesObjects.map(note => note.save())
  await Promise.all(promises) */

  for (const note of initialNotes) {
    const notesObject = new Note(note)
    await notesObject.save()
  }
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
