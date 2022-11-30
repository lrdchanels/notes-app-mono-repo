import { Note } from '../../models/Note.js'

const initialNotes = [
  {
    content: 'Note 1',
    important: true,
    data: new Date()
  },
  {
    content: 'Note 2',
    important: true,
    data: new Date()
  }
]

const getAllNotes = async () => {
  const response = await Note.find({})
  const contents = response.map(note => note.content)

  return { response, contents }
}

export { initialNotes, getAllNotes }
