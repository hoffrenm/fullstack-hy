import React from 'react'

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <p>Has {anecdote.votes} votes</p>
      <p>
        For more info see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  )
}

export default Anecdote
