import React from 'react'
import { Form, Button } from 'react-bootstrap'

import { Formik } from 'formik'
import * as Yup from 'yup'

const employeeSchema = Yup.object().shape({
  name: Yup.string().required(),
  title: Yup.string().required(),
  email: Yup.string().required(),
  currentEmployee: Yup.boolean().required()
})


const EmployeeForm = ({ sendForm, title, employee }) => {

  let employeeFields = {}

  if (employee !== undefined) {

    employeeFields = {
      ...employee,
      image: undefined,
      currentEmployee: false
    }

    delete employeeFields.projects
    delete employeeFields.image
    delete employeeFields.id

  }

  const submitFields = (form, {resetForm}) => {
    console.log(form)

    let fileName = ''
    const formData = new FormData();

    if (form.image === undefined) {
      console.log('image missing')
    } else {
      fileName = form.image.name
      formData.append('files', form.image)
    } 

    // console.log(fileName)
    // console.log(formData)

    const objectFields = {
      ...form,
      image: fileName
    }

    sendForm(objectFields, formData, {resetForm})
  }

  return (
    <>
      <h2 className='pageTitle'>{title}</h2>

      <div className='fastFadeIn'>

        <Formik
          validationSchema={employeeSchema}
          onSubmit={submitFields}
          initialValues={
          employee === undefined ?
            {
            name: '',
            title: '',
            email: '',
            currentEmployee: false,
            image: undefined
          }
          :
          { ...employeeFields }
        }
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            setFieldValue,
            values,
            touched,
            isValid,
            errors,
          }) => (
              <Form noValidate onSubmit={handleSubmit} encType='multipart/form-data'>

                <Form.Group>
                  <Form.Label>name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Firstname Lastname'
                    aria-describedby='inputGroupPrepend'
                    name='name'
                    value={values.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>title</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='title'
                    aria-describedby='inputGroupPrepend'
                    name='title'
                    value={values.title}
                    onChange={handleChange}
                    isInvalid={!!errors.title}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>email</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='firstname.lastname@office.fi'
                    aria-describedby='inputGroupPrepend'
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Check
                    className='checkBox'
                    name="currentEmployee"
                    label="current employee?"
                    onChange={handleChange}
                    value={values.currentEmployee}
                    isInvalid={!!errors.currentEmployee}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.File
                    disabled={!values.currentEmployee}
                    name='image'
                    label="profile picture"
                    type='file'
                    onChange={(event) => {
                      setFieldValue("image", event.currentTarget.files[0]);
                    }}
                  />
                </Form.Group>

                <Form.Group>
                  <Button variant='dark' type='submit'>submit</Button>
                </Form.Group>

              </Form>
            )}
        </Formik>

      </div>

    </>
  )
}

export default EmployeeForm