import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({
    message: null,
    type: null
  })

  useEffect(() => {
    personService.getAll().then(persons => {
      setPersons(persons)
    })
  }, [])

  const handleNotification = notification => {
    setNotification(notification)

    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 5000)
  }

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
        .then(() => {
          handleNotification({
            message: `${person.name} has been removed`,
            type: 'success'
          })
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(() => {
          handleNotification({
            message: `${person.name} was already removed from server`,
            type: 'error'
          })
          setPersons(persons.filter(person => person.id !== id))
        })
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
          .then(updatedPerson => {
            handleNotification({
              message: `${updatedPerson.name}'s number has been changed to ${updatedPerson.number}`,
              type: 'success'
            })
            setPersons(
              persons.map(person =>
                person.id !== personExists.id ? person : updatedPerson
              )
            )
          })
          .catch(() => {
            handleNotification({
              message: `information of ${personExists.name} was already removed from server`,
              type: 'error'
            })
            setPersons(persons.filter(person => person.id !== personExists.id))
          })
      }
    } else {
      personService.create(newPerson).then(person => {
        handleNotification({
          message: `${person.name} has been added to phonebook`,
          type: 'success'
        })
        setPersons(persons.concat(person))
      })
    }

    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification.message} type={notification.type} />
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
