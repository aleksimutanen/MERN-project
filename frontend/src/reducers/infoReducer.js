import infoService from '../services/info'

import history from '../components/history'
import { setNotification } from './notificationReducer'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE_INFO':
      return action.data
    case 'INIT_INFO':
      return action.data
    default:
      return state
  }
}

export const updateInfo = (id, info, formData, { resetForm }) => {
  return async dispatch => {

    try {

      await infoService.uploadImages(formData)

      const updatedInfo = await infoService.update(id, info)

      if (updatedInfo.logo !== '') {
        const image = await infoService.getImage(updatedInfo.logo)
        updatedInfo.logo = URL.createObjectURL(image)
      }

      if (updatedInfo.images.length > 0) {
        for (let i = 0; i < updatedInfo.images.length; i++) {
          const image = await infoService.getImage(updatedInfo.images[i])
          updatedInfo.images[i] = URL.createObjectURL(image)
        }
      }

      dispatch({
        type: 'UPDATE_INFO',
        data: updatedInfo,
      })

      dispatch(setNotification('Success', 'updated company info.', 5))
      resetForm({})
      history.push('/contact')
    }

    catch (exception) {
      dispatch(setNotification('Error', 'something went wrong in company info update.', 5))
    }
  }
}

export const initializeInfo = () => {
  return async dispatch => {

    try {

      const info = await infoService.get()

      const logo = await infoService.getImage(info.logo)
      info.logo = URL.createObjectURL(logo)

      for (let i = 0; i < info.images.length; i++) {
        const image = await infoService.getImage(info.images[i])
        info.images[i] = URL.createObjectURL(image)
      }

      dispatch({
        type: 'INIT_INFO',
        data: info,
      })
    }

    catch (exception) {
      dispatch(setNotification('Error', 'something went wrong in company info data fetch.', 5))
    }
  }
}


export default reducer