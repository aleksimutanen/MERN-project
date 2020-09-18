import React, {useState} from 'react'
import {Image, Collapse} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'

import {setToNull} from '../reducers/singleProjectReducer'

import placeHolder from '../images/projectPlaceholderr.jpg'
import {ProjectData} from './projectDataPage'


const Project = ({ project }) => {

  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  if (project.all) return (<ProjectData project={project} />)

  return (
    <>
      <div className='gridMember'>
        <Link to='#'
          onClick={() => setOpen(!open)}
          aria-controls="projectInfo"
          aria-expanded={open}
        >
          {project.images[0] !== undefined ?
            <Image className='listImage' src={project.images[0]} alt='no image found' fluid />

            :
            <Image className='listImage' src={placeHolder} alt='no image found' fluid />
          }

        </Link>

        <hr></hr>
        <p>{project.projectName}</p>
      </div>


      <Collapse in={open}>
        <div id="projectInfo">
          <div>status: {project.status}</div>
          <div>location: {project.location}</div>

          <div>
            <Link
              className='infoLink'
              to={`/projects/${project.id}`}
              onClick={() => dispatch(setToNull())}
            >
              click for more info
              </Link>
            <hr></hr>
            
          </div>
        </div>
      </Collapse>
    </>
  )
}

export default Project