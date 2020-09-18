import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner, Container } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

import ProjectForm from './projectForm'
import Loading from './loading'

import { updateProject } from '../reducers/projectReducer'
import { setForm } from '../reducers/formstateReducer'


const UpdateProject = ({title, redirectPath}) => {

  window.scroll(0,0)

  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const project = useSelector(state => state.singleProject)


  const projectUpdate = async (obj, formData, {resetForm}) => {

    dispatch(updateProject(project.id, obj, formData, {resetForm}))
  }

  if (!project) {
    return <Loading />
  }

  dispatch(setForm(project.type))

  return (
    <>
      <Container>

        {user ?
          <ProjectForm
           sendForm={projectUpdate} 
           title={`${title}: ${project.projectName}`} 
           project={project}
           />
          :
          <Redirect to={redirectPath} />
        }

      </Container>

    </>
  )
}

export default UpdateProject