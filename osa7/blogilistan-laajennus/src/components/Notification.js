import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'


const Notification = () => {
  const message = useSelector(state => state.notification)

  if (message === null) {
    return null
  }

  return <Alert severity="info" id='notification'>{message}</Alert>
}

export default Notification
