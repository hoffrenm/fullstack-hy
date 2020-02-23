import React from 'react'
import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = event => {
    event.preventDefault()

    const content = event.target.content.value
    event.target.content.value = ''

    dispatch(newAnecdote(content))
    dispatch(setNotification(`Anecdote ${content} added`, 5))
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

export default AnecdoteForm
