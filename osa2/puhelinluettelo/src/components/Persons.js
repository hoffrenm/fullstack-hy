import React from 'react'
import Person from './Person'

const Persons = ({ persons, filter, handleRemove }) => {
  persons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <>
      {persons.map(person => (
        <Person key={person.name} person={person} handleRemove={handleRemove} />
      ))}
    </>
  )
}

export default Persons
