import React from 'react'
import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'
import {
  setNotification,
  resetNotification
} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = async event => {
    event.preventDefault()

    const content = event.target.content.value
    event.target.content.value = ''

    const anecdote = await anecdoteService.createNew(content)

    dispatch(newAnecdote(anecdote))
    dispatch(setNotification(`Anecdote ${content} added`))

    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
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
