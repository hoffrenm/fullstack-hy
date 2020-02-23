import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)

  return response.data
}

const createNew = async content => {
  const response = await axios.post(baseUrl, { content, votes: 0 })

  return response.data
}

const vote = async id => {
  const response = await axios.get(`${baseUrl}/${id}`)
  const anecdote = response.data

  anecdote.votes = anecdote.votes + 1

  const response2 = await axios.put(`${baseUrl}/${id}`, anecdote, { new: true })
  return response2.data
}

export default { getAll, createNew, vote }
