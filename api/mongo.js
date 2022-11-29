import mongoose from 'mongoose'
const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

const uri = NODE_ENV === 'test'
  ? MONGO_DB_URI_TEST
  : MONGO_DB_URI

mongoose.connect(uri)
  .then(() => {
    console.log('Database connected')
  })
  .catch((e) => {
    console.log(e)
  })

process.on('uncaughtException', () => {
  mongoose.connection.close()
})
