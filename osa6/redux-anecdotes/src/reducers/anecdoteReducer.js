export const newAnecdote = anecdote => {
  return {
    type: 'NEW_ANECDOTE',
    data: { anecdote }
  }
}

export const voteAnecdote = id => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const initializeAnecdotes = anecdotes => {
  return {
    type: 'INIT_ANECDOTES',
    data: { anecdotes }
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const votedAnecdote = state.find(a => a.id === action.data.id)
      votedAnecdote.votes = votedAnecdote.votes + 1
      return state.map(a => (a.id !== votedAnecdote.id ? a : votedAnecdote))
    case 'NEW_ANECDOTE':
      return state.concat(action.data.anecdote)
    case 'INIT_ANECDOTES':
      return action.data.anecdotes
    default:
      return state
  }
}

export default reducer
