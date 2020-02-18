import React from 'react'

const Blog = ({ blog }) => {
  return (
    <div>
      <span>
        {blog.title} {blog.author}
      </span>
    </div>
  )
}

export default Blog
