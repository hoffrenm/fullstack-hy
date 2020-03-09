import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import Select from 'react-select'

const Authors = props => {
  const [bornYear, setBornYear] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState('')
  const result = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>Loading...</div>
  }

  const authors = result.data.allAuthors

  const updateBornYear = () => {
    editAuthor({ variables: { name: selectedAuthor.value, setBornTo: bornYear } })

    setBornYear('')
    setSelectedAuthor('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Select
        options={authors.map(a => ({ value: a.name, label: a.name }))}
        onChange={event => {
          setSelectedAuthor({ value: event.value, label: event.label })
        }}
        value={selectedAuthor}
      />
      Set born year to{' '}
      <input
        type="number"
        onChange={({ target }) => setBornYear(parseInt(target.value))}
        value={bornYear}
      />
      <button onClick={updateBornYear}>Update author</button>
    </div>
  )
}

export default Authors
