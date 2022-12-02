import { Router } from 'express'
import { getUsers, createUser, deleteUser } from '../controllers/users.controller.js'

const usersRouter = Router()

usersRouter.get('/', getUsers)
usersRouter.post('/', createUser)
usersRouter.delete('/:id', deleteUser)
export { usersRouter }
