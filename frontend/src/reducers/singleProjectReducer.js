import projectService from '../services/projects'

import { setNotification } from './notificationReducer'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_PROJECT':
      return action.data
    case 'SET_NULL':
      return action.data
    default:
      return state
  }
}


export const getAllProjectInfo = (id) => {
  return async dispatch => {

    try {

      const project = await projectService.getById(id)

      for (let i = 0; i < project.images.length; i++) {
        const image = await projectService.getImage(project.images[i])
        project.images[i] = URL.createObjectURL(image)
      }

      dispatch({
        type: 'SET_PROJECT',
        data: project,
      })

    }

    catch (exception) {
      dispatch(setNotification('Error', 'something went wrong fetching project page.', 5))
    }
  }
}

export const setToNull = () => {
  return async dispatch => {

    dispatch({
      type: 'SET_NULL',
      data: null
    })
  }
}

export default reducer
