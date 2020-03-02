import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Loginform from './components/Loginform'
import Blog from './components/Blog'
import BlogForm from './components/Blogform'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import User from './components/User'
import Users from './components/Users'
import { initializeBlogs } from './reducers/blogReducer'
import { checkLoggedUser, login, logout } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = React.createRef()

  const matchUser = useRouteMatch('/users/:id')
  const matchingUser = matchUser
    ? users.find(user => user.id === matchUser.params.id)
    : null

  const matchBlog = useRouteMatch('/blogs/:id')
  const matchingBlog = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(checkLoggedUser())
  }, [dispatch])

  const toggleVisibility = () => {
    blogFormRef.current.toggleVisibility()
  }

  const handleLogout = event => {
    event.preventDefault()
    dispatch(logout())
  }

  const handleLogin = async event => {
    event.preventDefault()
    dispatch(login({ username, password }))
    setUsername('')
    setPassword('')
  }

  const blogForm = () => (
    <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
      <BlogForm toggleVisibility={toggleVisibility} />
    </Togglable>
  )

  return (
    <>
      <Notification />
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
          <Switch>
            <Route path="/users/:id">
              <User user={matchingUser} />
            </Route>
            <Route path="/blogs/:id">
              <Blog blog={matchingBlog} />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              {blogForm()}
              <BlogList />
            </Route>
          </Switch>
        </div>
      )}
    </>
  )
}

export default App
