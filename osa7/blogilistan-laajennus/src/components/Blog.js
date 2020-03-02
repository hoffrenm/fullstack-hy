import React from 'react'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const addLike = () => {
    dispatch(likeBlog({ ...blog, likes: blog.likes + 1, user: blog.user.id }))
  }

  const deleteBlog = () => {
    if (
      window.confirm(`You are about to delete blog ´${blog.title}´, proceed?`)
    ) {
      dispatch(removeBlog(blog.id))
      dispatch(setNotification(`Blog ´${blog.title}´ removed`, 5))
    }
  }

  const deleteButton = () => <button onClick={deleteBlog}>Remove</button>

  if (!blog) {
    return null
  }

  return (
    <div className="blog">
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <p>
        Blog has been liked {blog.likes} times{' '}
        <button id="like-button" onClick={addLike}>
          Like
        </button>
      </p>
      <p>Added by {blog.user.name}</p>
      {blog.user.name === user.name && deleteButton()}
    </div>
  )
}

export default Blog
