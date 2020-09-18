import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Form, Image, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import {deleteEmployee} from '../reducers/employeesReducer'
import placeHolder from '../images/placeholder.jpg'


const Employee = ({ employee }) => {

  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  const deleteemployee = () => {
    const confirm = window.confirm(`Are you sure you want to delete ${employee.name}?`)

    if (confirm) {
      dispatch(deleteEmployee(employee.id))
    } else {
      return
    }
  }

  return (
    <>

      {employee.image !== ''
        ?
        <Image className='profileImage' src={employee.image} alt='no image found' fluid />
        :
        <Image className='profileImage' src={placeHolder} alt='no image found' fluid />
      }

      <div className='employeeProfile'>

        <div>{employee.name}</div>
        <p>{employee.title}</p>
        <p>{employee.email}</p>

        {user && user.admin ?
          <>
            <Form.Group>
              <Button onClick={() => deleteemployee()} variant='dark'>DELETE</Button>
            </Form.Group>
            <Form.Group>

              <Link to={`/contact/update/${employee.id}`}>
                <Button variant='dark'>update</Button>
              </Link>
            </Form.Group>
          </>
          :
          ''
        }
      </div>
    </>
  )
}

export default Employee