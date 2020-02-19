import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDelete, showDelete }) => {
  const [visible, setVisible] = useState(false)

  const showAdditionalInformation = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = () => {
    handleLike({ ...blog, likes: blog.likes + 1, user: blog.user.id })
  }

  const deleteBlog = () => {
    if (
      window.confirm(`You are about to delete blog ´${blog.title}´, proceed?`)
    ) {
      handleDelete(blog)
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
      <div style={baseStyle}>
        {blog.title} {blog.author}{' '}
        <button onClick={() => toggleVisibility()}>view</button>
      </div>
    )
  }

  return (
    <div style={baseStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={() => toggleVisibility()}>hide</button>
      <div style={showAdditionalInformation}>
        <a href={blog.url}>{blog.url}</a>
        <br />
        {blog.likes} likes <button onClick={addLike}>Like</button>
        <br />
        Added by {blog.user.name}
      </div>
      {deleteButton()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  showDelete: PropTypes.bool.isRequired
}

export default Blog
