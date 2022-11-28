import mongoose from 'mongoose'
import { password } from './password.js'

const { connection, model, Schema } = mongoose

const uri = `mongodb+srv://notes-user:${password}@cluster0.3e3uwbh.mongodb.net/app-db?retryWrites=true&w=majority`

mongoose.connect(uri)
  .then(() => {
    console.log('Database connected')
  })
  .catch((e) => {
    console.log(e)
  })

const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean
})

const Note = model('Note', noteSchema)

const note = new Note({
  content: 'Note createt by app',
  date: new Date(),
  important: Math.random() < 0.5
})

note.save()
  .then((result) => {
    console.log(result)
    connection.close()
  })
  .catch((err) => {
    console.log(err)
  })

Note.find({}).then(result => {
  console.log(result)
  connection.close()
})
