import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

import EmployeeForm from './employeeForm'
import { createEmployee } from '../reducers/employeesReducer'


const AddEmployee = ({ title, redirectPath }) => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  const addEmployee = async (obj, formData, { resetForm }) => {
    dispatch(createEmployee(obj, formData, { resetForm }))
  }

  return (
    <Container>

      {user ?
        <EmployeeForm sendForm={addEmployee} title={title} />
        :
        <Redirect to={redirectPath} />
      }

    </Container>
  )
}

export default AddEmployee