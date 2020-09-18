import React from 'react'
import { Form, Button, Col } from 'react-bootstrap'

import { Formik } from 'formik'
import * as Yup from 'yup'

const parkingSchema = Yup.object().shape({
  projectName: Yup.string().required(),
  status: Yup.string().required(),
  relevant: Yup.boolean().required(),
  location: Yup.string().required(),
  shortDescription: Yup.string().required(),
  description: Yup.string().required(),
  startingDate: Yup.string().required(),
  finishedDate: Yup.string().required(),
  employer: Yup.string().required(),
  mainDesigner: Yup.string().required(),
  assistantDesigner: Yup.string().required(),
  parkingAreaM2: Yup.number().required(),
  parkingspotsCount: Yup.number().required()
})


const ParkingComplexFormFields = ({ sendFields, project }) => {

  let projectFields = {}

  if (project !== undefined) {

    projectFields = {
      ...project,
      mainDesigner: project.mainDesigner.name,
      assistantDesigner: project.assistantDesigner.name,
      images: undefined,
      relevant: false
    }

    delete projectFields.__t
    delete projectFields.images
    delete projectFields.id

  }

  console.log('project: ', project)
  console.log('fields: ', projectFields)

  const submitFields = (form, { resetForm }) => {
    console.log(form)

    const fileNames = []
    const formData = new FormData();

    if (form.images === undefined) {
      console.log('no images in form')
    } else {

      for (let i = 0; i < form.images.length; i++) {
        fileNames.push(form.images[i].name)
        formData.append('files', form.images[i])
      }
    }

    console.log(fileNames)
    console.log(formData)

    const objectFields = {
      ...form,
      type: 'parkingComplex',
      images: fileNames
    }

    sendFields(objectFields, formData, { resetForm })
  }

  return (
    <>
      <Formik
        validationSchema={parkingSchema}
        onSubmit={submitFields}
        initialValues={
          project === undefined ?
            {
              projectName: '',
              status: 'designing',
              relevant: false,
              location: '',
              shortDescription: '',
              description: '',
              startingDate: '',
              finishedDate: '',
              employer: '',
              mainDesigner: '',
              assistantDesigner: '',
              parkingAreaM2: 0,
              parkingspotsCount: 0,
              images: undefined
            }
            :
            { ...projectFields }
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
                <Form.Label>project name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='example: As Oy Coolhouse'
                  aria-describedby='inputGroupPrepend'
                  name='projectName'
                  value={values.projectName}
                  onChange={handleChange}
                  isInvalid={!!errors.projectName}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>status</Form.Label>
                <Form.Control
                  as='select'
                  aria-describedby='inputGroupPrepend'
                  name='status'
                  value={values.status}
                  onChange={handleChange}
                  isInvalid={!!errors.status}
                >
                  <option>designing</option>
                  <option>construction</option>
                  <option>finished</option>
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>location</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='City, Country'
                  aria-describedby='inputGroupPrepend'
                  name='location'
                  value={values.location}
                  onChange={handleChange}
                  isInvalid={!!errors.location}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>short description</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='short description'
                  aria-describedby='inputGroupPrepend'
                  name='shortDescription'
                  value={values.shortDescription}
                  onChange={handleChange}
                  isInvalid={!!errors.shortDescription}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>description</Form.Label>
                <Form.Control
                  as='textarea'
                  rows='4'
                  type='text'
                  placeholder='description'
                  aria-describedby='inputGroupPrepend'
                  name='description'
                  value={values.description}
                  onChange={handleChange}
                  isInvalid={!!errors.description}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>employer</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='employer name'
                  aria-describedby='inputGroupPrepend'
                  name='employer'
                  value={values.employer}
                  onChange={handleChange}
                  isInvalid={!!errors.employer}
                />
              </Form.Group>

              <Form.Row>

                <Col>
                  <Form.Group>
                    <Form.Label>starting date</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='YYYY-MM-DD'
                      aria-describedby='inputGroupPrepend'
                      name='startingDate'
                      value={values.startingDate}
                      onChange={handleChange}
                      isInvalid={!!errors.startingDate}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group>
                    <Form.Label>finished date</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='YYYY-MM-DD'
                      aria-describedby='inputGroupPrepend'
                      name='finishedDate'
                      value={values.finishedDate}
                      onChange={handleChange}
                      isInvalid={!!errors.finishedDate}
                    />
                  </Form.Group>
                </Col>

              </Form.Row>
              <Form.Row>

                <Col>
                  <Form.Group>
                    <Form.Label>main designer</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Firstname Lastname'
                      aria-describedby='inputGroupPrepend'
                      name='mainDesigner'
                      value={values.mainDesigner}
                      onChange={handleChange}
                      isInvalid={!!errors.mainDesigner}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group>
                    <Form.Label>assistant designer</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Firstname Lastname'
                      aria-describedby='inputGroupPrepend'
                      name='assistantDesigner'
                      value={values.assistantDesigner}
                      onChange={handleChange}
                      isInvalid={!!errors.assistantDesigner}
                    />
                  </Form.Group>
                </Col>

              </Form.Row>

              <Form.Row>

                <Col>
                  <Form.Group>
                    <Form.Label>parking area in m2</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='number'
                      aria-describedby='inputGroupPrepend'
                      name='parkingAreaM2'
                      value={values.parkingAreaM2}
                      onChange={handleChange}
                      isInvalid={!!errors.parkingAreaM2}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group>
                    <Form.Label>parkingspots count</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='number'
                      aria-describedby='inputGroupPrepend'
                      name='parkingspotsCount'
                      value={values.parkingspotsCount}
                      onChange={handleChange}
                      isInvalid={!!errors.parkingspotsCount}
                    />
                  </Form.Group>
                </Col>

              </Form.Row>

              <Form.Group>
                <Form.Check
                  className='checkBox'
                  name="relevant"
                  label="is this a relevant project?"
                  onChange={handleChange}
                  value={values.relevant}
                  isInvalid={!!errors.relevant}
                />
              </Form.Group>

              <Form.Group>
                <Form.File
                  disabled={!values.relevant}
                  name='images'
                  label="image files"
                  type='file'
                  multiple
                  onChange={(event) => {
                    setFieldValue("images", event.currentTarget.files);
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Button variant='dark' type='submit'>submit</Button>
              </Form.Group>

            </Form>
          )}
      </Formik>
    </>
  )
}

export default ParkingComplexFormFields