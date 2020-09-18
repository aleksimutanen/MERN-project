import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch, Link } from 'react-router-dom'
import { Image, Button, Form, Container } from 'react-bootstrap'

import { getAllProjectInfo } from '../reducers/singleProjectReducer'
import { deleteProject } from '../reducers/projectReducer'
import Loading from './loading'

const lodash = require('lodash/string');


const DisplayFields = ({ project }) => {

  const description = project.description

  let moddedProject = {
    ...project,
    mainDesigner: project.mainDesigner.name,
    assistantDesigner: project.assistantDesigner.name
  }

  delete moddedProject.description
  delete moddedProject.__t
  delete moddedProject.images
  delete moddedProject.id
  delete moddedProject.projectName
  delete moddedProject.shortDescription
  delete moddedProject.relevant

  return (
    <>
      <p>{project.shortDescription}</p>

      {project.images.map((img, i) =>
        <Image className='infoImg' key={i} src={img} alt='no image found' fluid />
      )}

      {Object.keys(moddedProject).map((key, i) =>
        <div key={i}>
          {lodash.startCase(key)}: {moddedProject[key]}
        </div>
      )}
      <br></br>
      <p>{description}</p>
    </>
  )
}

const ProjectPage = ({linkPath}) => {

  const dispatch = useDispatch()

  const match = useRouteMatch("/projects/:id")
  const project = useSelector(state => state.singleProject)
  const user = useSelector(state => state.user)


  useEffect(() => {
    dispatch(getAllProjectInfo(match.params.id))
  }, [])


  const deleteproject = () => {
    const confirm = window.confirm(`Are you sure you want to delete ${project.projectName}?`)

    if (confirm) {
      dispatch(deleteProject(project.id))
    } else {
      return
    }
  }

  return (
    <>
      <Container>

        {!project ?
          <Loading />
          :
          <>
            <h2 className='pageTitle'>{project.projectName}</h2>

            <div className='fastFadeIn'>

              <DisplayFields project={project} />

              {user
                ?
                <>
                  {user.admin
                    ?
                    <Form.Group>
                      <Button onClick={() => deleteproject()} variant='dark'>DELETE</Button>
                    </Form.Group>
                    :
                    ''
                  }
                  <Form.Group>
                    <Link to={`${linkPath}/${project.id}`}>
                      <Button variant='dark'>update</Button>
                    </Link>
                  </Form.Group>
                </>
                :
                ''
              }

            </div>
          </>
        }

      </Container>
    </>
  )
}

export default ProjectPage