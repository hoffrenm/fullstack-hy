import React from 'react'
import { useField } from '../hooks/index'

const AnecdoteForm = props => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = e => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const resetFields = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} reset={null} />
        </div>
        <div>
          author
          <input {...author} reset={null} />
        </div>
        <div>
          url for more info
          <input {...info} reset={null} />
        </div>
        <button type="submit">Create</button>
        <button type="button" onClick={resetFields}>
          Reset
        </button>
      </form>
    </div>
  )
}

export default AnecdoteForm
