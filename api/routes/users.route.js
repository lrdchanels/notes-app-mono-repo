import { Router } from 'express'
import { createUser } from '../controllers/users.controller.js'

const usersRouter = Router()

usersRouter.post('/', createUser)

export { usersRouter }
