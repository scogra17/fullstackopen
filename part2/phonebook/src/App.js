import React, { useEffect, useState } from 'react'
import personsService from './services/persons'
import Person from './components/person'

const Persons = ({ persons, handleDelete }) => {
  return (
    <>
      {persons.map(person => {
        return <Person key={person.id} person={person} handleDelete={() => handleDelete(person)}/>
      })}
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
  const [persons, setPersons] = useState([])

  const hook = () => {
    personsService
      .getAll()
      .then(returnedPersons => {
        setPersons(returnedPersons)
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
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    const existingPerson = persons.filter(person => person.name === newName)
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to your phonebook, replace the old number with a new one?`)) {
        updateContact({...newPerson, id: existingPerson[0].id })
      }
    } else {
      personsService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const updateContact = (person) => {
    personsService
      .update(person.id, person)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const deleteContact = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
      .deleteContact(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
      })
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
      <Persons persons={personsToDisplay} handleDelete={deleteContact}/>
    </div>
  )
}

export default App
