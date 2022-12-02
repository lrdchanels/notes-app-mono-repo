import 'dotenv/config.js'
import './mongo.js'

import express from 'express'
import cors from 'cors'

import { usersRouter } from './routes/users.route.js'
import { notesRouter } from './routes/notes.route.js'
import { notFound } from './middlewares/notFound.js'
import { handleErrors } from './middlewares/handleErrors.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/images', express.static('./images'))

app.get('/', (request, response) => {
  response.send('<h1>Hello Wold</h1>')
})

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)

app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export { app, server }
