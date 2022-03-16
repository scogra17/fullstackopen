require('dotenv').config() // must be imported before Note model
const express = require('express')
const Note = require('./models/note')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())

app.get('/', (request, response) => {
  // Since the parameter is a string, express automatically sets the value of the Content-Type header to be text/html. The status code of the response defaults to 200.
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes/:id', (request, response) => {
  // const id = Number(request.params.id)
  // const note = notes.find(note => note.id === id)

  // if (note) {
  //   response.json(note)
  // } else {
  //   response.statusMessage = `Note with id ${id} does not exist`;
  //   response.status(404).end()
  // }
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
  // Note.findById(request.params.id).then(note => {
  //   response.json(note)
  // })
})

app.get('/api/notes', (request, response) => {
  // The request is responded to with the json method of the response object. Calling the method will send the notes array that was passed to it as a JSON formatted string. Express automatically sets the Content-Type header with the appropriate value of application/json.
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
