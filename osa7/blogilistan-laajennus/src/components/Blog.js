import React, { useState } from 'react'
import { likeBlog, removeBlog, addComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  TextField
} from '@material-ui/core'

const Blog = ({ blog }) => {
  const [comment, setComment] = useState('')
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  const addLike = () => {
    dispatch(
      likeBlog({
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id,
        comments: blog.comments.map(c => c.id)
      })
    )
  }

  const deleteBlog = () => {
    if (
      window.confirm(`You are about to delete blog ´${blog.title}´, proceed?`)
    ) {
      dispatch(removeBlog(blog.id))
      dispatch(setNotification(`Blog ´${blog.title}´ removed`, 5))
      history.push('/')
    }
  }

  const commentBlog = event => {
    event.preventDefault()
    dispatch(addComment(blog, comment))
    setComment('')
  }

  const deleteButton = () => (
    <Button color="secondary" variant="contained" onClick={deleteBlog}>
      Remove
    </Button>
  )

  if (!blog) {
    return null
  }

  return (
    <Paper>
      <Box p={3} className="blog">
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={11}>
            <Typography variant="h3">{blog.title}</Typography>
          </Grid>
          <Grid item xs={1}>
            {blog.user.name === user.name && deleteButton()}
          </Grid>
        </Grid>
        <p>
          More information at:
          <a href={blog.url}>{blog.url}</a>
        </p>
        <p>
          Blog has been liked {blog.likes} times{' '}
          <Button
            color="primary"
            size="small"
            variant="contained"
            id="like-button"
            onClick={addLike}
          >
            Like
          </Button>
        </p>
        <p>Added by {blog.user.name}</p>
        <h4>Comments</h4>
        <ul>
          {blog.comments.map(comment => (
            <li key={comment.id}>{comment.content}</li>
          ))}
        </ul>
        <form onSubmit={commentBlog}>
          <TextField
            label="Comment about blog"
            name="content"
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          ></TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            type="submit"
          >
            Comment
          </Button>
        </form>
      </Box>
    </Paper>
  )
}

export default Blog
