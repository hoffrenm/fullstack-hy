import React, { useState, useEffect } from 'react'
import { useMutation, useLazyQuery } from '@apollo/client'
import { LOGIN, USER_INFO } from '../queries'

const LoginForm = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN)
  const [updateUserInfo] = useLazyQuery(USER_INFO)

  const handleLogin = async event => {
    event.preventDefault()
    await login({ variables: { username, password } })
    updateUserInfo()
  }

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      setPage('books')
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data]) //eslint-disable-line

  if (!show) {
    return null
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        Username:{' '}
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password:{' '}
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" onClick={handleLogin}>
        Login
      </button>
    </form>
  )
}

export default LoginForm
