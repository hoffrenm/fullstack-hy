import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(
    () => personService.getAll().then(persons => setPersons(persons)),
    []
  )

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = event => {
    setFilter(event.target.value)
  }

  const removePerson = id => {
    const person = persons.find(person => person.id === id)

    if (window.confirm(`Ỳou are about to delete ${person.name}, proceed?`))
      personService
        .remove(id)
        .then(() => setPersons(persons.filter(person => person.id !== id)))
  }

  const addPerson = event => {
    event.preventDefault()

    const personExists = persons.find(
      person => person.name.toLowerCase() === newName.toLowerCase()
    )

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (personExists) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, do you want to replace the number?`
        )
      ) {
        personService
          .update(personExists.id, newPerson)
          .then(updatedPerson =>
            setPersons(
              persons.map(person =>
                person.id !== personExists.id ? person : updatedPerson
              )
            )
          )
      }
    } else {
      personService
        .create(newPerson)
        .then(person => setPersons(persons.concat(person)))
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
      <Persons persons={persons} filter={filter} handleRemove={removePerson} />
    </div>
  )
}

export default App
