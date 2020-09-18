import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Alert, Button } from 'react-bootstrap'

import { removeNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()

  const notification = useSelector(state => state.notification)
  
  if (notification === null) {
    return null

  } else {

    return (

      <Alert variant="dark" className='notification'>
        <Alert.Heading>{notification.heading}</Alert.Heading>

        <p>
          {notification.content}
        </p>

        <hr />

        <div>
          <Button variant='dark' onClick={() => dispatch(removeNotification())}>
            Close
          </Button>
        </div>
      </Alert>
    )
  }
}

export default Notification