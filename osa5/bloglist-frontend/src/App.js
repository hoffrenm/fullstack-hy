import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import Loginform from './components/Loginform'
import BlogForm from './components/Blogform'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)

  const blogFormRef = React.createRef()

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
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(createdBlog))
      handleNotification(
        `A blog ${createdBlog.title} by ${createdBlog.author} has been added`
      )
    } catch (exception) {
      handleNotification('error adding a blog, check fields')
    }
  }

  const likeBlog = async blogObject => {
    try {
      const updatedBlog = await blogService.update(blogObject.id, blogObject)
      setBlogs(
        blogs.map(blog => (blog.id !== blogObject.id ? blog : updatedBlog))
      )
    } catch (exception) {
      console.log(exception)
    }
  }

  const deleteBlog = async blogObject => {
    try {
      await blogService.remove(blogObject.id)
      setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
      handleNotification(`Blog ´${blogObject.title}´ removed`)
    } catch (exception) {
      console.log(exception)
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
      blogService.setToken(user.token)
    } catch (exception) {
      handleNotification(exception.response.data.error)
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const blogList = () => {
    return (
      <div id="bloglist">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={likeBlog}
              handleDelete={deleteBlog}
              showDelete={user.username === blog.user.username}
            />
          ))}
      </div>
    )
  }

  return (
    <>
      <Notification message={notification} />
      {user === null ? (
        <div>
          <Loginform
            handleLogin={handleLogin}
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
          />
        </div>
      ) : (
        <div>
          <h1>Blogs</h1>
          <p>
            Logged in as {user.name}{' '}
            <button onClick={handleLogout}>Logout</button>
          </p>
          {blogForm()}
          {blogList()}
        </div>
      )}
    </>
  )
}

export default App
