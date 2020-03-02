import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, showDelete }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const showAdditionalInformation = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

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

  const baseStyle = {
    padding: '5px 0px 5px 10px',
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteButton = () => {
    if (showDelete) {
      return (
        <>
          <button onClick={deleteBlog}>Remove</button>
        </>
      )
    }

    return <></>
  }

  if (!visible) {
    return (
      <div className="blog" style={baseStyle}>
        {blog.title} {blog.author}{' '}
        <button className="toggleDetails" onClick={() => toggleVisibility()}>
          view
        </button>
      </div>
    )
  }

  return (
    <div className="blog" style={baseStyle}>
      {blog.title} {blog.author}{' '}
      <button className="toggleDetails" onClick={() => toggleVisibility()}>
        hide
      </button>
      <div style={showAdditionalInformation} className="details">
        <a href={blog.url}>{blog.url}</a>
        <br />
        {blog.likes} likes{' '}
        <button id="like-button" onClick={addLike}>
          Like
        </button>
        <br />
        Added by {blog.user.name}
      </div>
      {deleteButton()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  showDelete: PropTypes.bool.isRequired
}

export default Blog
