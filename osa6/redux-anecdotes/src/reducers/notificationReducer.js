const initialState = null

var timeoutId

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch(setMessage(message))

    timeoutId = window.setTimeout(() => {
      dispatch(resetNotification())
    }, time * 1000)
  }
}

const setMessage = message => {
  window.clearTimeout(timeoutId)

  return {
    type: 'SET_NOTIFICATION',
    data: { message }
  }
}

const resetNotification = () => {
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
