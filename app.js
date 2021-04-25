const express = require("express");
const app = express();
const port = 3000;

const persons = [
  {
    id: 1,
    name: "Arto Hellias",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122",
  },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/info", (req, res) => {
  const date = new Date();
  const info = `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`;
  res.send(info);
});

app.get("/api/persons", (req, res) => {
  res.send(persons);
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
