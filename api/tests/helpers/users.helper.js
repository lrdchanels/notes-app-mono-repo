import bcrypt from 'bcrypt'
import { User } from '../../models/User.js'

const initialUsers = [
  {
    username: 'lrdchanels',
    name: 'Sergi',
    passwordHash: await bcrypt.hash('psw', 10)
  },
  {
    username: 'octapus',
    name: 'Ocatavi',
    passwordHash: await bcrypt.hash('psw2', 10)
  }
]

const getAllUsers = async () => {
  const filter = {}
  const response = await User.find(filter)

  return { response }
}

const getUserByUsername = async (username) => {
  const filter = { username }
  const response = await User.findOne(filter)

  return { response }
}
export { initialUsers, getAllUsers, getUserByUsername }
