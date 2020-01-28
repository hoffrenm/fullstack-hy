import React from 'react'

const PersonForm = ({
  handleSubmit,
  name,
  number,
  handleNameChange,
  handleNumberChange
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        Name <input value={name} onChange={handleNameChange} />
        <br />
        Number <input value={number} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}

export default PersonForm
