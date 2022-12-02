import bcrypt from 'bcrypt'
import { User } from '../models/User.js'

const getUsers = async (request, response, next) => {
  try {
    const users = await User.find({}).populate('notes', {
      content: 1,
      date: 1,
      important: 1
    })

    await response.json(users)
  } catch (error) {
    next(error)
  }
}

const createUser = async (request, response) => {
  const { body } = request
  const { username, name, password } = body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  try {
    const user = new User({
      username,
      name,
      passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch (error) {
    response.status(409).json(error)
  }
}

const deleteUser = async (request, response, next) => {
  const { id } = request.params

  try {
    await User.findByIdAndDelete(id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
}

export { getUsers, createUser, deleteUser }
