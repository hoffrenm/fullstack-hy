import React from 'react'

const baseStyle = {
  fontSize: 24,
  textAlign: 'center',
  background: 'lightgrey',
  borderRadius: 10,
  borderStyle: 'solid',
  width: 600,
  padding: 10,
  marginBottom: 15,
  color: 'red',
  borderColor: 'red'
}

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  let style = { ...baseStyle }

  if (type === 'success') {
    style = { ...baseStyle, color: 'green', borderColor: 'green' }
  }

  return <div style={style}>{message}</div>
}

export default Notification
