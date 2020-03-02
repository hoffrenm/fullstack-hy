import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  const baseStyle = {
    padding: '5px 0px 5px 10px',
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div id="bloglist">
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <div style={baseStyle} key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
    </div>
  )
}

export default BlogList
