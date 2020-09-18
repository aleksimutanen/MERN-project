import React from 'react'
import ProjectForm from './projectForm'
import { useDispatch, useSelector } from 'react-redux'
import { createProject } from '../reducers/projectReducer'
import { Container } from 'react-bootstrap'

import { Redirect } from 'react-router-dom'


const AddProject = ({ title, redirectPath }) => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  const addProject = async (obj, formData, { resetForm }) => {
    dispatch(createProject(obj, formData, { resetForm }))
  }

  return (
    <Container>

      {user ?
        <ProjectForm sendForm={addProject} title={title} />
        :
        <Redirect to={redirectPath} />
      }

    </Container>
  )
}

export default AddProject