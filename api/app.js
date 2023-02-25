const express = require('express')
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')
const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')

const cors = require('cors')
const usersRouter = require('./controllers/users')
const notesRouter = require('./controllers/notes')
const loginRouter = require('./controllers/login')

const app = express()
app.disable('x-powered-by')

const corsOptions = {
  origin: ['http://localhost:5173']
}

Sentry.init({
  dsn: 'https://a90cf75f33814376b4387573c29ed87e@o4504715738349568.ingest.sentry.io/4504715740971008',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app })
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
})

app.use(Sentry.Handlers.requestHandler())
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler())

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static('../app/dist'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(notFound)
app.use(Sentry.Handlers.errorHandler())
app.use(handleErrors)

module.exports = app
