import employeesService from '../services/employees'

import history from '../components/history'
import { setNotification } from './notificationReducer'

const reducer = (state = [], action) => {

  switch (action.type) {
    case 'NEW_EMPLOYEE':
      return [...state, action.data]
    case 'UPDATE_EMPLOYEE':
      const updatedEmployee = action.data
      const id = action.data.id
      return state.map(p =>
        p.id !== id ? p : updatedEmployee
      )
    case 'DELETE_EMPLOYEE':
      return state.filter(e => e.id !== action.data)
    case 'INIT_EMPLOYEES':
      return action.data
    case 'GET_IMAGE':
      return action.data
    default:
      return state
  }
}

export const createEmployee = (employee, formData, { resetForm }) => {
  return async dispatch => {

    try {

      await employeesService.uploadImages(formData)

      const newEmployee = await employeesService.createNew(employee)
      if (newEmployee.image !== '') {
        const image = await employeesService.getImage(newEmployee.image)
        newEmployee.image = URL.createObjectURL(image)
      }

      dispatch({
        type: 'NEW_EMPLOYEE',
        data: newEmployee,
      })

      dispatch(setNotification('Success', `created employee ${newEmployee.name}.`, 5))
      resetForm({})
      history.push('/contact')
    }

    catch (exception) {
      dispatch(setNotification('Error', `something went wrong in creation.`, 5))
    }
  }
}

export const updateEmployee = (id, employee, formData, { resetForm }) => {
  return async dispatch => {

    try {

      await employeesService.uploadImages(formData)

      const updatedEmployee = await employeesService.update(id, employee)
      if (updatedEmployee.image !== '') {
        const image = await employeesService.getImage(updatedEmployee.image)
        updatedEmployee.image = URL.createObjectURL(image)
      }

      dispatch({
        type: 'UPDATE_EMPLOYEE',
        data: updatedEmployee,
      })

      dispatch(setNotification('Success', `updated employee ${updatedEmployee.name}.`, 5))
      resetForm({})
      history.push('/contact')
    }

    catch (exception) {
      dispatch(setNotification('Error', 'something went wrong in update.', 5))
    }
  }
}

export const deleteEmployee = (id) => {
  return async dispatch => {

    try {

      await employeesService.remove(id)

      dispatch({
        type: 'DELETE_EMPLOYEE',
        data: id
      })

      dispatch(setNotification('Success', `deleted employee.`, 5))
      history.push(`/contact`)
    }

    catch (exception) {
      dispatch(setNotification('Error', `something went wrong in project deletion.`, 5))
    }
  }
}


export const initializeEmployees = () => {
  return async dispatch => {

    try {
      const employees = await employeesService.getAll()

      for (let i = 0; i < employees.length; i++) {
        if (employees[i].image !== '') {
          const image = await employeesService.getImage(employees[i].image)
          employees[i].image = URL.createObjectURL(image)
        }
      }

      dispatch({
        type: 'INIT_EMPLOYEES',
        data: employees,
      })
    }

    catch (exception) {
      dispatch(setNotification('Error', 'something went wrong in employees data fetch.', 5))
    }
  }
}


// export const createEmployee = (employee, formData) => {
//   return async dispatch => {

//     await employeesService.uploadImages(formData)

//     const newEmployee = await employeesService.createNew(employee)

//     dispatch({
//       type: 'NEW_EMPLOYEE',
//       data: newEmployee,
//     })
//   }
// }



// export const updateEmployee = (id, employee, formData) => {
//   return async dispatch => {

//     await employeesService.uploadImages(formData)

//     const updatedEmployee = await employeesService.update(id, employee)

//     // const image = await employeesService.getImage(updatedEmployee.image)
//     // updatedEmployee.image = URL.createObjectURL(image)

//     dispatch({
//       type: 'UPDATE_EMPLOYEE',
//       data: updatedEmployee,
//     })
//   }
// }

// export const initializeEmployees = () => {
//   return async dispatch => {
//     const employees = await employeesService.getAll()

//     // employees.forEach(element => {
//     //   console.log(element.image)
//     // });

//     // console.log(employees[6].image)

//     for (let i = 0; i < employees.length; i++) {
//       const b64 = employees[i].image.toString('base64')
//       const byteCharacters = atob(b64)

//       const byteNumbers = new Array(byteCharacters.length);
//       for (let k = 0; k < byteCharacters.length; k++) {
//         byteNumbers[k] = byteCharacters.charCodeAt(k);
//       }

//       const byteArray = new Uint8Array(byteNumbers);

//       const blob = new Blob([byteArray], { type: 'image/jpeg' });

//       employees[i].image = URL.createObjectURL(blob)
//     }

//     dispatch({
//       type: 'INIT_EMPLOYEES',
//       data: employees,
//     })
//   }
// }



export default reducer