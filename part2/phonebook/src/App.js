import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Person = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  )
}

const Persons = ({ persons }) => {
  return (
    <>
      { persons.map(person => <Person key={person.name} person={person}/>) }
    </>
  )
}

const Filter = ({ onChange, value }) => {
  return (
    <div>
      filter shown with <input
        onChange={onChange}
        value={value}
      />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form>
        <div>
          name: <input
            value={props.valueName}
            onChange={props.onChangeName}
          />
        </div>
        <div>
          number: <input
            value={props.valueNumber}
            onChange={props.onChangeNumber}
          />
        </div>
        <div>
          <button onClick={props.addContact} type="submit">add</button>
        </div>
      </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addContact = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to your phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  const personsToDisplay = persons.filter(person => {
    return person.name.toLowerCase().includes(newFilter.toLowerCase())
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange} value={newFilter}/>
      <h2>add a new</h2>
      <PersonForm
        onChangeName={handleNameChange}
        valueName={newName}
        onChangeNumber={handleNumberChange}
        valueNumber={newNumber}
        addContact={addContact}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToDisplay}/>
    </div>
  )
}

export default App
