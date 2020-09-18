import AddProject from './addProject'
import AddEmployee from './addEmployee'
import ProjectPage from './projectPage'
import ProjectsGallery from './projectsGallery'
import ProjectDataPage from './projectDataPage'
import Contact from './contact'
import UpdateProject from './updateProject'
import UpdateEmployee from './updateEmployee'
import CompanyInfoForm from './companyInfoForm'
import Home from './home'
import LoginForm from './loginForm'
import About from './about'

import React from 'react'
import { useSelector } from 'react-redux'

import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

const Switcher = () => {

  const user = useSelector(state => state.user)

  return (
    <>
      <Switch>

        <Route path="/projects/update/:id">
          {user ?
            <UpdateProject title='Update project' redirectPath='/login' /> :
            <Redirect to='/login' />
          }
        </Route>

        <Route path="/projects/alldata">
          <ProjectDataPage title='Older projects' />
        </Route>

        <Route path="/projects/:id">
          <ProjectPage linkPath='/projects/update' />
        </Route>

        <Route path="/projects">
          <ProjectsGallery title='Projects' />
        </Route>

        <Route path="/contact/info/update/:id">
        {user ?
            <CompanyInfoForm title='Update company info and pictures' redirectPath='/'/> :
            <Redirect to='/login' />
          }
        </Route>

        <Route path="/contact/update/:id">
          {user ?
            <UpdateEmployee title='Update employee' redirectPath='/login' /> :
            <Redirect to='/login' />
          }
        </Route>
        
        <Route path="/contact/">
          <Contact title='Contact'/>
        </Route>

        <Route path="/create">
          {user ?
            <AddProject title='Add project' redirectPath='/login' /> :
            <Redirect to='/login' />
          }
        </Route>

        <Route path="/add">
          {user ?
            <AddEmployee title='Add employee' redirectPath='/login' /> :
            <Redirect to='/login' />
          }
        </Route>

        <Route path="/login">
          <LoginForm title='Login' redirectPath='/' />
        </Route>

        <Route path='/about'>
          <About title='About us' />
        </Route>

        <Route path="/">
          <Home />
        </Route>

      </Switch>
    </>
  )
}

export default Switcher