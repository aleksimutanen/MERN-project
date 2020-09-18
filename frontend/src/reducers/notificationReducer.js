const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'REMOVE_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

let timeoutID

export const setNotification = (heading, content, timer) => {
  return async dispatch => {

    if (typeof timeoutID === 'number') {
      console.log('timeout is active, resetting')
      window.clearTimeout(timeoutID)
    }

    dispatch({
      type: 'SET_NOTIFICATION',
      notification: { heading, content }
    })

    timeoutID = await setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
        notification: null
      })
    }, timer * 1000);
    console.log('timeoutID: ', timeoutID)
  }
}

export const removeNotification = () => {
  return async dispatch => {

    dispatch({
      type: 'REMOVE_NOTIFICATION',
      notification: null
    })
  }
}

export default notificationReducer