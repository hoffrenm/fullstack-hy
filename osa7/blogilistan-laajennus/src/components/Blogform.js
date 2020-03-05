import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { TextField, Button } from '@material-ui/core'

const Blogform = ({ toggleVisibility }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = event => {
    event.preventDefault()
    toggleVisibility()
    dispatch(createBlog({ title, author, url }))

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h3>Add new blog</h3>
      <form className="blogForm" onSubmit={addBlog}>
        <div>
          <TextField
            label="Title"
            variant="filled"
            id="title"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            label="Author"
            variant="filled"
            id="author"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            label="Url"
            variant="filled"
            id="url"
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <br />
        <Button color="primary" variant="contained" type="submit">Submit</Button>
      </form>
    </div>
  )
}

export default Blogform
