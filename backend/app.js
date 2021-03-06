const config = require('./utils/config')

const projectsRouter = require('./controllers/projects')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const employeesRouter = require('./controllers/employees')
const infoRouter = require('./controllers/info')

const logger = require('./utils/logger')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

// const imgPath = path.join(__dirname, 'uploads');
// app.use(express.static('uploads'))

app.use(middleware.tokenExtractor)
app.use(express.static('build'))

app.use('/api/projects', projectsRouter)
app.use('/api/employees', employeesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/info', infoRouter)

if (process.env.NODE_ENV === 'test') {
  const testRouter = require('./controllers/testing')
  app.use('/api/testing', testRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
