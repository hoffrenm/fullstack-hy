const initialState = null

export const setNotification = message => {
  return {
    type: 'SET_NOTIFICATION',
    data: { message }
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET_NOTIFICATION',
    data: null
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data.message
    case 'RESET_NOTIFICATION':
      return null
    default:
      return state
  }
}

export default reducer
