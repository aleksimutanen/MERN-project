import React from 'react'

import { logOut } from '../reducers/loginReducer'

import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { Navbar, Nav, Image } from 'react-bootstrap'


const NavBar = () => {

  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const info = useSelector(state => state.info)

  const logOutHandle = () => {
    dispatch(logOut())
  }


  return (
    <>
      <Navbar className='navbar border-bottom border-dark' collapseOnSelect expand="lg" variant="light" sticky='top'>

        {!info ?
          '' :
          <Navbar.Brand href='#'>

            <Image
              alt=''
              src={info.logo}
              width='40vw'
              height='30vh'
              className='d-inline-block align-center'
            />
            {' '}

            <b className='navbarInfoName'>{info.name}</b>
          </Navbar.Brand>
        }

        <Navbar.Toggle aria-controls="responsive-navbar-nav" className='navbarToggle' />
        <Navbar.Collapse id="responsive-navbar-nav">

          <Nav className="ml-auto text-right" >


            <Nav.Link href="#" as="span"
            >
              <NavLink
                className='navItem'
                to="/about"
                activeClassName='navActiveItem'
              >
                about us
              </NavLink>
            </Nav.Link>

            <Nav.Link href="#" as="span">
              <NavLink
                className='navItem'
                strict to="/projects"
                activeClassName='navActiveItem'
              >
                projects
              </NavLink>
            </Nav.Link>

            <Nav.Link href="#" as="span">
              <NavLink
                className='navItem'
                strict to="/contact"
                activeClassName='navActiveItem'
              >
                contact
              </NavLink>
            </Nav.Link>

            {user ?
              <>
                <Nav.Link href="#" as="span">
                  <NavLink
                    className='navItem'
                    to="/create"
                    activeClassName='navActiveItem'
                  >
                    new project
                </NavLink>
                </Nav.Link>

                {user.admin ?
                  <Nav.Link href="#" as="span">
                    <NavLink
                      className='navItem'
                      to="/add"
                      activeClassName='navActiveItem'
                    >
                      new employee
                  </NavLink>
                  </Nav.Link>
                  :
                  ''
                }
              </>
              :
              <Nav.Link href="#" as="span">
                <NavLink
                  className='navItem'
                  to="/login"
                  activeClassName='navActiveItem'
                >
                  login
              </NavLink>
              </Nav.Link>
            }

            {user
              ?
              <Navbar.Text className='navbarUser'>
                <a>{user.name}</a>
                {' //// '}
                <Link to='#' onClick={() => logOutHandle()}>
                  <b>logout</b>
                </Link>
              </Navbar.Text>
              :
              ''
            }

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default NavBar