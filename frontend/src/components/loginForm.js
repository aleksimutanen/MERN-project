import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Container } from 'react-bootstrap'

import { Formik } from 'formik'
import * as Yup from 'yup'

import { login } from '../reducers/loginReducer'
import { Redirect } from 'react-router-dom'


const loginSchema = Yup.object({
  username: Yup.string().required(),
  password: Yup.string().required()
})

const LoginForm = ({title, redirectPath}) => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  const submitLogin = (form) => {
    console.log(form)
    dispatch(login(form.username, form.password))
  }

  return (
    <>
      <Container>

        {user ?
          <Redirect to={redirectPath} /> :
          ''}

        {/* <h2>Login</h2> */}
        <h2 className='pageTitle'>{title}</h2>

        <div className='fastFadeIn'>

          <Formik
            validationSchema={loginSchema}
            onSubmit={submitLogin}
            initialValues={{
              username: '',
              password: '',
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
            }) => (
                <Form noValidate onSubmit={handleSubmit}>

                  <Form.Group>
                    <Form.Label>username</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='username'
                      aria-describedby='inputGroupPrepend'
                      name='username'
                      value={values.username}
                      onChange={handleChange}
                      isInvalid={!!errors.username}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>password</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='password'
                      aria-describedby='inputGroupPrepend'
                      name='password'
                      value={values.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Button variant='dark' type='submit'>login</Button>
                  </Form.Group>

                </Form>
              )}
          </Formik>

        </div>

      </Container>
    </>
  )
}

export default LoginForm