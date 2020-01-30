import React from 'react'

const Filter = ({ value, handleChange }) => {
  return (
    <>
      <p>
        Filter countries by name <input value={value} onChange={handleChange} />
      </p>
    </>
  )
}

export default Filter
