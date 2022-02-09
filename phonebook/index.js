require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const app = express();
const Contact = require('./models/contact');

app.use(express.static('build'));

morgan.token('newPerson', (request) => {
  if (request.method === 'POST') return JSON.stringify(request.body)
})

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :newPerson'));
app.use(cors());

app.get('/api/persons', (request, response) => {
  Contact.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/info', (request, response) => {
	const date = new Date()
  Contact.find({}).then(persons => {
    response.send(
      `<p>Phonebook has info for ${persons.length} people</p>
      <p>${date.toGMTString()}</p>`
    )
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Contact.findById(request.params.id)
    .then(contact => {
      if (contact) {
        response.json(contact)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  Contact.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  const { body } = request;

  if (!body.name) {
    return result.status(400).json({
      error: 'name required',
    })
  }
  if (!body.number) {
    return result.status(400).json({
      error: 'number required',
    })
  }

  const person = new Contact({
    name: body.name,
    number: body.number,
  });

  person.save().then(savedContact => {
    response.json(savedContact)
  })
});

app.put('/api/persons/:id', (request, response, next) => {
  const { body } = request
  const person = {
    name: body.name,
    number: body.number,
  }

  Contact.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch((error) => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})