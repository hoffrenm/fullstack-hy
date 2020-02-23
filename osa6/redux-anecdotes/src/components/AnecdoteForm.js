import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = event => {
    event.preventDefault()
    dispatch(createAnecdote(event.target.content.value))
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
