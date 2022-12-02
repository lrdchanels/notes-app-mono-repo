import mongoose from 'mongoose'
import { server } from '../index.js'

import { User } from '../models/User.js'
import { api } from './helpers/helper.helper.js'
import { initialUsers, getAllUsers, getUserByUsername } from './helpers/users.helper.js'

describe('POST', () => {
  it('a valid user can be added', async () => {
    const { response: usersAtStart } = await getAllUsers()

    const newUser = {
      username: 'ElCarlos',
      name: 'Carlos',
      password: 'F_EDA'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const { response: usersAtEnd } = await getAllUsers()
    const { response: userDB } = await getUserByUsername(newUser.username)

    expect(usersAtStart).toHaveLength(usersAtEnd.length - 1)
    expect(newUser.username).toBe(userDB.username)
  })

  it('creation fails with proper statuscode and message if username is already taken', async () => {
    const { response: usersAtStart } = await getAllUsers()

    const newUser = await { password: initialUsers[0].passwordHash, ...initialUsers[0] }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(409)
      .expect('Content-Type', /application\/json/)

    const { response: usersAtEnd } = await getAllUsers()

    expect(usersAtStart).toHaveLength(usersAtEnd.length)
    expect(result.body.errors.username.message).toContain('`username` to be unique')
  })
})

beforeEach(async () => {
  await User.deleteMany({})

  for (const user of initialUsers) {
    const notesObject = new User(user)
    await notesObject.save()
    console.log(user)
  }
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
