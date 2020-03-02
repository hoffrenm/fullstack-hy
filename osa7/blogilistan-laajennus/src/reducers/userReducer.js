import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

export const checkLoggedUser = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)

      dispatch({
        type: 'INIT_USER',
        data: { user }
      })
    }
  }
}

export const login = credentials => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      dispatch({
        type: 'LOGIN',
        data: { user }
      })
    } catch (exception) {
      dispatch(setNotification('Invalid username or password', 5))
    }
  }
}

export const logout = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.revokeToken()

    dispatch({
      type: 'LOGOUT'
    })
  }
}

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_USER':
    case 'LOGIN':
      return action.data.user
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export default reducer
