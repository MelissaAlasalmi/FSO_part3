require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const Contact = require('./models/contact');

app.use(express.static('build'));
app.use(express.json());
app.use(cors());

app.get('/api/persons', (request, response) => {
  Contact.find({}).then(persons => response.json(persons))
})

app.get('/api/info', (request, response) => {
	const date = new Date()
  Contact.find({}).then(persons => {
    response.send(
      `<p>Phonebook has info for ${persons.length} people</p>
      <p>${date.toGMTString()}</p>`)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Contact.findById(request.params.id)
    .then(contact => {
      if (contact) response.json(contact) 
      else response.status(404).end()
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  Contact.findByIdAndRemove(request.params.id)
    .then(() => response.status(204).end())
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const { body } = request;
  const person = new Contact({
    name: body.name,
    number: body.number,
  });

  person.save().then(savedContact => {
    response.json(savedContact)
  })
  .catch(error => next(error))
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
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})