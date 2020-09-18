import React from 'react'
import { useSelector } from 'react-redux'
import { Button, Container, Form, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Loading from './loading'
import Grid from './grid'
import GoogleMaps from './googleMaps'


const CompanyInfo = ({ companyInfo, user }) => {
  const info = { ...companyInfo }

  delete info.logo
  delete info.about
  delete info.images
  delete info.id
  delete info.coords

  return (
    <>
      <Row className='justify-content-md-center imagesRow'>
        <Col md={4}>
          {Object.keys(info).map((k, i) =>
            <div key={i}>
              <>{info[k]}</>
            </div>
          )
          }
          <br></br>

          {user && user.admin ?
            <Form.Group>
              <Link to={`/contact/info/update/${companyInfo.id}`}>
                <Button variant='dark'>update</Button>
              </Link>
            </Form.Group>
            :
            ''}
        </Col>
        <Col md={8}>
          <GoogleMaps />
        </Col>
      </Row>
    </>
  )
}


const Contact = ({ title }) => {

  const user = useSelector(state => state.user)
  const companyInfo = useSelector(state => state.info)

  const employees = useSelector(({ user, employees }) => {

    if (user && user.admin) return employees

    return employees.filter(e => e.currentEmployee)
  })

  return (
    <>
      <Container>
        {employees.length === 0 || !companyInfo
          ?
          <Loading />
          :
          <>
            <h2 className='pageTitle'>{title}</h2>

            <div className='fastFadeIn'>

              <CompanyInfo companyInfo={companyInfo} user={user} />

              <Grid
                items={employees}
                itemsPerRow={3}
                componentName='employee'
              />

            </div>
          </>
        }
      </Container>
    </>
  )
}

export default Contact