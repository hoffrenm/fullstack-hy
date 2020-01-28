import React from 'react'
import Person from './Person'

const Persons = ({ persons, filter }) => {
  persons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <>
      {persons.map(person => (
        <Person key={person.name} person={person} />
      ))}
    </>
  )
}

export default Persons
