import express from 'express';
import { persons } from './persons';

const app = express();
const port = 3000;
const error = 'Error 404. This page does not exist';

// Necesitamos esto para poder leer JSON
app.use(express.json());

// GET
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/info', (req, res) => {
  const date = new Date();
  const info = `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`;
  res.send(info);
});

app.get('/api/persons', (req, res) => {
  res.send(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const person = persons.find(
    (person) => person.id === parseInt(req.params.id, 10),
  );
  if (!person) {
    res.status(404).send(error);
  }
  res.send(person);
});

// POST
app.post('/api/persons', (req, res) => {
  const data = req.body;
  if (!data.name) {
    res.status(400).send({ error: 'name is required' });
  } else if (!data.number) {
    res.status(400).send({ error: 'number is required' });
  }

  const person = persons.find((person) => person.name === data.name);
  if (person) {
    res.status(400).send({ error: 'name must be unique' });
  }

  const newPerson = {
    id: Math.round(Math.random() * 10000),
    name: req.body.name,
    number: req.body.number,
  };
  persons.push(newPerson);
  res.send(newPerson);
});

// DELETE
app.delete('/api/persons/:id', (req, res) => {
  const person = persons.find(
    (person) => person.id === parseInt(req.params.id, 10),
  );
  if (!person) {
    res.status(404).send(error);
  }
  const index = persons.indexOf(person);
  persons.splice(index, 1);
  res.send(person);
});

// app.get("*", (req, res) => {
// res.status(404).send(error);
// });
// Middleware
app.use((req, res, next) => {
  res.status(404).send('Sorry cant find that!');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
