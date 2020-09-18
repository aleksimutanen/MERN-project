import loginService from '../services/login'
import projectService from '../services/projects'
import employeeService from '../services/employees'
import infoService from '../services/info'

import { setNotification } from './notificationReducer'

import history from '../components/history'


const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return action.data
    case 'LOGIN_FAILED':
      return action.data
    case 'LOG_OUT':
      return action.data
    default:
      return state
  }
}


export const login = (username, password) => {
  return async dispatch => {

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        process.env.REACT_APP_STORAGE_ITEM_NAME, JSON.stringify(user)
      )

      projectService.setToken(user.token)
      employeeService.setToken(user.token)
      infoService.setToken(user.token)

      dispatch({
        type: 'LOGIN_SUCCESS',
        data: user
      })

      dispatch(setNotification('Success', 'you logged in.', 5))
      history.push('/')
    }

    catch (exception) {

      dispatch({
        type: 'LOGIN_FAILED',
        data: null
      })

      dispatch(setNotification('Error', 'login failed.', 5))
    }
  }
}

export const loggedIn = () => {
  return async dispatch => {

    const loggedUserJSON = window.localStorage.getItem(process.env.REACT_APP_STORAGE_ITEM_NAME)


    if (loggedUserJSON) {

      const user = JSON.parse(loggedUserJSON)

      dispatch({
        type: 'LOGIN_SUCCESS',
        data: user
      })

      projectService.setToken(user.token)
      employeeService.setToken(user.token)
      infoService.setToken(user.token)
    }
  }
}

export const logOut = () => {
  return async dispatch => {
    window.localStorage.clear()

    dispatch({
      type: 'LOG_OUT',
      data: null
    })

    dispatch(setNotification('Success', 'you logged out.', 5))
    history.push('/')
  }
}

export default loginReducer