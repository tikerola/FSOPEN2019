require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')


app.use(bodyParser.json())
app.use(cors())


app.use(express.static('build'))
mongoose.set('useFindAndModify', false)

morgan.token('reqBody', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqBody'))

app.get('/', (req, res, next) => {
  res.send('Hello there!')
})

app.get('/info', (req, res, next) => {
  Person.find({}).then(persons => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>`)
  })

})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id

  Person.findById(id).then(person => {
    res.send(person.toJSON())
  })
    .catch(error => next(error))

})

app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(persons => {

    res.send(persons)
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id

  Person.findByIdAndRemove(id).then(() => {
    res.status(204).end()
  })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body

  if (!name || !number) {
    res.status(400).send('Content missing')
  }

  const newPerson = new Person({
    name,
    number,
    date: new Date()
  })

  newPerson.save().then(savedPerson => {
    res.send(savedPerson)
  }).catch(err => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {

  Person.findByIdAndUpdate(req.body.id, req.body, { new: true, runValidators: true, context: 'query' })
    .then(newPerson => {
      res.send(newPerson)
    })
    .catch(error => next(error))
})

const handleErrors = (error, req, res, next) => {

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(handleErrors)


const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
