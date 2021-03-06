const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :newPerson'));

morgan.token('newPerson', (request) => {
  if (request.method === 'POST') return JSON.stringify(request.body)
})

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/', (request, response) => {
  response.send('<h1>Hello, person!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/info', (request, response) => {
	const date = new Date()
	response.send(
		`<p>Phonebook has info for ${persons.length} people</p>
		<p>${date.toGMTString()}</p>`
	)
})

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	person = persons.find(person => person.id === id)
	person ? response.json(person) : response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	persons = persons.filter(person => person.id !== id)
  
	response.status(204).end()
})

app.use(express.json())
app.post('/api/persons', (request, result) => {

  const body = request.body;

  if (persons.some(person => person.name === body.name)) {
    return result.status(400).json({
      error: "person already exists"
    });
  }

  if (persons.some(person => person.number === body.number)) {
    return result.status(400).json({
      error: "number already exists"
    });
  }

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

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 1000000)
  };

  persons = persons.concat(person);
  result.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})