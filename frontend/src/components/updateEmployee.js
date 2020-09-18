import React from 'react'
import EmployeeForm from './employeeForm'

import { useRouteMatch, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateEmployee } from '../reducers/employeesReducer'
import { Container } from 'react-bootstrap'

import Loading from './loading'


const UpdateEmployee = ({title, redirectPath}) => {
  const dispatch = useDispatch()

  const employees = useSelector(state => state.employees)
  const user = useSelector(state => state.user)

  const updateemployee = async (obj, formData, {resetForm}) => {
    dispatch(updateEmployee(employee.id, obj, formData, {resetForm}))
  }

  const match = useRouteMatch("/contact/update/:id")
  const employee = match ?
    employees.find(employee => employee.id === match.params.id)
    :
    null

  if (!employee) {
    return <Loading />
  }

  return (
    <Container>

      {user ?
        <EmployeeForm 
        sendForm={updateemployee} 
        title={`${title}: ${employee.name}`} 
        employee={employee}
        />
        :
        <Redirect to={redirectPath} />
      }

    </Container>
  )
}

export default UpdateEmployee