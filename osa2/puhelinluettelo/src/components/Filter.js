import React from 'react'

const Filter = ({ filter, handleFilterChange }) => {
  return <p>Filter list by name <input value={filter} onChange={handleFilterChange}/></p>
}

export default Filter
