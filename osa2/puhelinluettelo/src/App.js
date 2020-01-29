import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data)
    })
  }, [])

  const handleNameChange = event => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = event => {
    setFilter(event.target.value)
  }

  const addPerson = event => {
    event.preventDefault()

    const exists = persons.find(person => person.name === newName)

    if (exists) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(newPerson))
    }

    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        handleSubmit={addPerson}
        name={newName}
        number={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App
