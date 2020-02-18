import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Loginform from './components/Loginform'
import BlogForm from './components/Blogform'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async blogObject => {
    try {
      const createdBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(createdBlog))
      handleNotification(
        `A blog ${createdBlog.title} by ${createdBlog.author} has been added`
      )
    } catch (exception) {
      handleNotification('error adding a blog, check fields')
    }
  }

  const handleNotification = message => {
    setNotification(message)

    setTimeout(() => {
      setNotification(null)
    }, 4000)
  }

  const handleLogout = event => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.revokeToken()
    setUser(null)
  }

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('LOGIN TOKEN: ', user.token)
      blogService.setToken(user.token)
    } catch (exception) {
      handleNotification(exception.response.data.error)
    }
  }

  if (!user) {
    return (
      <div>
        <Notification message={notification} />
        <Loginform
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />
      <p>
        Logged in as {user.name} <button onClick={handleLogout}>Logout</button>
      </p>
      <BlogForm createBlog={addBlog} />
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
