import React, { useState } from 'react'
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'
import Anecdote from './components/Anecdote'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Menu from './components/Menu'
import About from './components/About'
import Footer from './components/Footer'

const App = () => {
  const [notification, setNotification] = useState('')
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const history = useHistory()
  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match ? anecdotes.find(a => a.id === match.params.id) : null

  const addNew = anecdote => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    showNotification(`A new anecdote ´${anecdote.content}´ created!`, 10)
    setAnecdotes(anecdotes.concat(anecdote))
    history.push('/')
  }

  const showNotification = (message, time) => {
    setNotification(message)

    setTimeout(() => {
      setNotification(null)
    }, time * 1000)
  }

  const anecdoteById = id => anecdotes.find(a => a.id === id)

  const vote = id => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => (a.id === id ? voted : a)))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification}
      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route path="/create">
          <AnecdoteForm addNew={addNew} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes}></AnecdoteList>
        </Route>
      </Switch>

      <Footer />
    </div>
  )
}

export default App
