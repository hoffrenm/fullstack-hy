import userService from '../services/users'

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()

    dispatch({
      type: 'INIT_USERS',
      data: { users }
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data.users
    default:
      return state
  }
}

export default reducer
