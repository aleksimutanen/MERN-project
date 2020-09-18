import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container } from 'react-bootstrap'

import Loading from './loading'

import ProjectFilter from './filterAndSearch'
import Pagination from './pagination'
import Grid from './grid'
import pageDivider from './pageDivider'
import { setDefaultIndex } from '../reducers/pageIndexReducer'


const ProjectsGallery = ({ title }) => {

  const pageIndex = useSelector(state => state.pageIndex)

  const projects = useSelector(({ search, filter, projects }) => {
    if (projects[0] === false) return projects

    projects = projects.filter(p => p.relevant)

    if (filter.filterWord === 'all' && search === '') return projects

    let filteredProjects = []

    if (filter.filterWord !== 'all') {
      switch (filter.filterType) {

        case 'type':
          console.log('1')
          filteredProjects = projects.filter(p => p.type === filter.filterWord && !p.all)
          break

        case 'status':
          console.log('2')
          filteredProjects = projects.filter(p => p.status === filter.filterWord &&!p.all)
          break

        default:
          console.log('3')
          filteredProjects = projects
          break
      }
    } else {
      filteredProjects = projects
    }

    filteredProjects = filteredProjects.filter(p => p.projectName.toLowerCase().includes(search))

    if (filteredProjects.length === 0) {
      console.log('no results')
      return filteredProjects

    } else {
      console.log('filtered results')
      return filteredProjects
    }
  })

  // console.log(projects)


  const pagedProjects = pageDivider(projects, 6)
  console.log(pagedProjects)

  return (
    <>
      <Container>

        <h2 className='pageTitle'>{title}</h2>

        {projects[0] === false ?

          <Loading />
          :
          <div className='fastFadeIn'>

            <ProjectFilter />

            {projects.length === 0 ?
              <h4>no results.</h4>
              :
              <>

                <Grid
                  items={pagedProjects[pageIndex - 1]}
                  itemsPerRow={3}
                  componentName='project'
                />

                <Pagination length={pagedProjects.length} />

              </>
            }
          </div>
        }

      </Container>
    </>
  )
}

export default ProjectsGallery