import anecdoteService from '../services/anecdotes'

export const newAnecdote = content => {
  return async dispatch => {
    const savedAnecdote = await anecdoteService.createNew(content)

    dispatch({
      type: 'NEW_ANECDOTE',
      data: { anecdote: savedAnecdote }
    })
  }
}

export const voteAnecdote = id => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.vote(id)

    dispatch({
      type: 'VOTE',
      data: { anecdote: votedAnecdote }
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()

    dispatch({
      type: 'INIT_ANECDOTES',
      data: { anecdotes }
    })
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const voted = action.data.anecdote
      return state.map(a => (a.id !== voted.id ? a : voted))
    case 'NEW_ANECDOTE':
      return state.concat(action.data.anecdote)
    case 'INIT_ANECDOTES':
      return action.data.anecdotes
    default:
      return state
  }
}

export default reducer
