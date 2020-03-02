var timeoutId

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch(setMessage(message))

    timeoutId = window.setTimeout(() => {
      dispatch(clearMessage())
    }, time * 1000)
  }
}

const setMessage = message => {
  window.clearTimeout(timeoutId)

  return {
    type: 'SET_MESSAGE',
    data: { message }
  }
}

const clearMessage = () => {
  return {
    type: 'CLEAR_MESSAGE'
  }
}

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.data.message
    case 'CLEAR_MESSAGE':
      return null
    default:
      return state
  }
}

export default reducer
