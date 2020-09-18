import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Image, Collapse, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { setDefaultIndex } from '../reducers/pageIndexReducer'
import { setToNull } from '../reducers/singleProjectReducer'

import placeHolder from '../images/projectPlaceholder.jpg'

import Loading from './loading'
import Grid from './grid'
import ProjectFilter from './filterAndSearch'


export const ProjectData = ({ project }) => {

  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className='gridMember'>
        <Link to='#'
          onClick={() => setOpen(!open)}
          aria-controls="projectInfo"
          aria-expanded={open}
        >
          <Image className='listImage' src={placeHolder} alt='no image found' fluid />

        </Link>

        <hr></hr>
        <p>{project.projectName}</p>
      </div>

      <Collapse in={open}>
        <div id="projectInfo">

          <div>
            {project.projectName === 'Older projects' ?
              <Link
                className='infoLink'
                to={`/projects/alldata`}
              >
                click to see older projects
            </Link>
              :
              <Link
                className='infoLink'
                to={`/projects/${project.id}`}
                onClick={() => dispatch(setToNull())}
              >
                click for more info
              </Link>
            }
            <hr></hr>

          </div>
        </div>
      </Collapse>
    </>
  )
}


const ProjectDataPage = ({ title }) => {

  window.scroll(0, 0)

  const olderProjects = useSelector(({ search, filter, projects }) => {
    if (projects[0] === false) return projects

    projects = projects.filter(p => !p.relevant)

    if (filter.filterWord === 'all' && search === '') return projects

    let filteredProjects = []

    if (filter.filterWord !== 'all') {
      switch (filter.filterType) {

        case 'type':
          filteredProjects = projects.filter(p => p.type === filter.filterWord)
          break

        case 'status':
          filteredProjects = projects.filter(p => p.status === filter.filterWord)
          break

        default:
          filteredProjects = projects
          break
      }
    } else {
      filteredProjects = projects
    }

    filteredProjects = filteredProjects.filter(p => p.projectName.includes(search))

    if (filteredProjects.length === 0) {
      console.log('no results')
      return filteredProjects

    } else {
      console.log('filtered results')
      return filteredProjects
    }
  })

  const getProjectFields = (projects) => {
    if (projects[0] === false) return null

    let moddedProjects = []

    projects.forEach(project => {
      if (!project.all) {
        const projectName = project.projectName
        let moddedProject = {
          projectName: projectName,
          ...project,
          mainDesigner: project.mainDesigner.name,
          assistantDesigner: project.assistantDesigner.name
        }

        delete moddedProject.description
        delete moddedProject.__t
        delete moddedProject.images
        delete moddedProject.relevant

        moddedProjects.push(moddedProject)
      }
    })

    return moddedProjects
  }


  const projects = getProjectFields(olderProjects)
  console.log(projects)

  return (
    <>
      <Container>

        <h2 className='pageTitle'>{title}</h2>

        {olderProjects[0] === false ?

          <Loading />
          :
          <div className='fastFadeIn'>

            <ProjectFilter />

            {olderProjects.length === 0 ?
              <h4>no results.</h4>
              :
              <>

                <Grid
                  items={projects}
                  itemsPerRow={3}
                  componentName='projectData'
                />

              </>
            }

          </div>
        }

      </Container>
    </>
  )
}

export default ProjectDataPage