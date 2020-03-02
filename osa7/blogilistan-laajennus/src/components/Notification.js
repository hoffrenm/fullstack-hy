import React from 'react'
import { useSelector } from 'react-redux'

const baseStyle = {
  fontSize: 24,
  textAlign: 'center',
  background: 'lightgrey',
  borderRadius: 10,
  borderStyle: 'solid',
  width: 600,
  padding: 10,
  marginBottom: 15
}

const Notification = () => {
  const message = useSelector(state => state.notification)

  if (message === null) {
    return null
  }

  return <div id='notification' style={baseStyle}>{message}</div>
}

export default Notification
