import mongoose from 'mongoose'
import { server } from '../index.js'

import { User } from '../models/User.js'
import { api } from './helpers/helper.helper.js'
import { initialUsers, getAllUsers, getUserByUsername } from './helpers/users.helper.js'

describe('POST', () => {
  it('a valid user can be added', async () => {
    const { response: firstResponse } = await getAllUsers()

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

    const { response: secondResponse } = await getAllUsers()
    const { response: userDB } = await getUserByUsername(newUser.username)

    console.log(userDB)

    expect(firstResponse).toHaveLength(secondResponse.length - 1)
    expect(newUser.username).toBe(userDB.username)
  })
})

beforeEach(async () => {
  await User.deleteMany({})

  for (const user of initialUsers) {
    const notesObject = new User(user)
    await notesObject.save()
  }
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
