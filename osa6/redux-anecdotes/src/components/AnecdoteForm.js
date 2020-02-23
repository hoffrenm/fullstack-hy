import React from 'react'
import { connect } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const create = event => {
    event.preventDefault()

    const content = event.target.content.value
    event.target.content.value = ''

    props.newAnecdote(content)
    props.setNotification(`Anecdote ${content} added`, 5)
  }

  return (
    <>
      <h3>Add new anecdote</h3>
      <form onSubmit={create}>
        <input type="text" name="content" />
        <button type="submit">Add</button>
      </form>
      <br />
    </>
  )
}

const mapDispatchToProps = {
  newAnecdote, setNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
