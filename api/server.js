
require('dotenv').config()

const mongoose = require('mongoose')
const app = require('./app')
const PORT = process.env.PORT || 3001

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env
const connectionString = NODE_ENV === 'test' ? MONGO_DB_URI_TEST : MONGO_DB_URI
mongoose.set('strictQuery', false)
mongoose
  .connect(connectionString)
  .then(() => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`))
  })
  .catch((err) => {
    console.log(err)
  })
