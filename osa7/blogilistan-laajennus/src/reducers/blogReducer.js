import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()

    dispatch({
      type: 'INIT_BLOGS',
      data: { blogs }
    })
  }
}

export const addComment = (blog, content) => {
  return async dispatch => {
    try {
      const commentedBlog = await blogService.addComment(blog.id, content)

      dispatch({
        type: 'ADD_COMMENT',
        data: { commentedBlog }
      })

      dispatch(setNotification('Comment saved successfully!', 5))
    } catch (exception) {
      dispatch(setNotification('Something went wrong', 5))
    }
  }
}

export const createBlog = blogObject => {
  return async dispatch => {
    try {
      const createdBlog = await blogService.create(blogObject)
      dispatch({
        type: 'ADD_BLOG',
        data: { createdBlog }
      })

      dispatch(
        setNotification(
          `A blog ${createdBlog.title} by ${createdBlog.author} has been added`,
          5
        )
      )
    } catch (exception) {
      dispatch(setNotification('Error adding a blog', 5))
    }
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const likedBlog = await blogService.update(blog.id, blog)

    dispatch({
      type: 'ADD_LIKE',
      data: { likedBlog }
    })
  }
}

export const removeBlog = id => {
  return async dispatch => {
    await blogService.remove(id)

    dispatch({
      type: 'REMOVE_BLOG',
      data: { id }
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data.blogs
    case 'ADD_BLOG':
      return state.concat(action.data.createdBlog)
    case 'ADD_LIKE':
      const liked = action.data.likedBlog
      return state.map(blog => (blog.id !== liked.id ? blog : liked))
    case 'ADD_COMMENT':
      const commented = action.data.commentedBlog
      return state.map(blog => (blog.id !== commented.id ? blog : commented))
    case 'REMOVE_BLOG':
      return state.filter(blog => blog.id !== action.data.id)
    default:
      return state
  }
}

export default reducer
