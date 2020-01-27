import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const MostVotedAnecdote = ({ anecdotes, points }) => {
  const mostVotes = Math.max(...points)
  const index = points.indexOf(mostVotes)

  if (mostVotes === 0) {
    return <p>No anecdote has been voted yet</p>
  }

  return (
    <>
      <p>{anecdotes[index]}</p>
      <p>Has {points[index]} votes</p>
    </>
  )
}

const App = props => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length))
  }

  const voteAnecdote = id => {
    const temp = [...points]
    temp[id] += 1
    setPoints(temp)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {props.anecdotes[selected]}
      <p>Has {points[selected]} votes</p>
      <button onClick={nextAnecdote}>Next anecdote</button>
      <button onClick={() => voteAnecdote(selected)}>Vote</button>
      <h2>Anecdote with most votes</h2>
      <MostVotedAnecdote anecdotes={anecdotes} points={points} />
    </div>
  )
}

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))
