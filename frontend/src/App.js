import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import { Container } from 'react-bootstrap'

import Notification from './components/notification'
import NavBar from './components/navbar'
import Switcher from './components/routeSwitcher'
import Footer from './components/footer'

import { initializeProjects } from './reducers/projectReducer'
import { loggedIn } from './reducers/loginReducer'
import { initializeEmployees } from './reducers/employeesReducer'
import { initializeInfo } from './reducers/infoReducer'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeInfo())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeProjects())
  }, [dispatch])

  useEffect(() => {
    dispatch(loggedIn())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeEmployees())
  }, [dispatch])

  

  return (
    <>
      <div className='slider'></div>

      <Container fluid>

        <NavBar />
        <Notification />

      </Container>

      <Switcher />

      <Container fluid>

        <Footer />

      </Container>

    </>
  )
}

export default App;
