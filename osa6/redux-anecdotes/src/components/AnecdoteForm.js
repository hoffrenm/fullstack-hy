import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {
  setNotification,
  resetNotification
} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = event => {
    event.preventDefault()
    dispatch(createAnecdote(event.target.content.value))
    dispatch(setNotification(`Anecdote ${event.target.content.value} added`))

    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)

    event.target.content.value = ''
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
