import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Container } from 'react-bootstrap'

import { Formik } from 'formik'
import * as Yup from 'yup'

import { updateInfo } from '../reducers/infoReducer'
import { Redirect } from 'react-router-dom'


const infoSchema = Yup.object({
  name: Yup.string().required(),
  address: Yup.string().required(),
  postalCode: Yup.string().required(),
  phone: Yup.string().required(),
  companyId: Yup.string().required(),
  about: Yup.string().required(),
  coords: Yup.string().required(),

  logo: Yup.string().required(),
  // images: Yup.array().of(string).required()
})

const CompanyInfoForm = ({title, redirectPath}) => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const info = useSelector(state => state.info)


  const submitInfo = (form, {resetForm}) => {
    console.log(form)

    const fileNames = []
    let logoName = ''
    const formData = new FormData();

    const about = form.about.split('\n\n')
    const latlng = form.coords.split(',')
    console.log(latlng)

    const coords = {
      lat: parseFloat(latlng[0]),
      lng: parseFloat(latlng[1])
    }

    if (form.logo !== undefined) {
      formData.append('files', form.logo)
      logoName = form.logo.name
    } else console.log('no logo found')

    if (form.images !== undefined) {
      for (let i = 0; i < form.images.length; i++) {
        fileNames.push(form.images[i].name)
        formData.append('files', form.images[i])
      }
    } else console.log('no images found')

    const objectFields = {
      ...form,
      coords: coords,
      type: 'competition',
      about: about,
      images: fileNames,
      logo: logoName
    }

    dispatch(updateInfo(info.id ,objectFields, formData, { resetForm }))
  }


  const reducer = (accumulator, currentValue) => accumulator + '\n\n' + currentValue;

  let infoFields = {}

  const about = info.about.reduce(reducer)

    infoFields = {
      ...info,
      about: about,
      coords: info.coords.lat + ',' + info.coords.lng,
      logo: undefined,
      images: undefined
    }

    delete infoFields.id

  return (
    <>
      <Container>

        {!user ?
          <Redirect to={redirectPath} /> :
          ''}

        <h2 className='pageTitle'>{title}</h2>

        <div className='fastFadeIn'>

          <Formik
            validationSchema={infoSchema}
            onSubmit={submitInfo}
            initialValues={{...infoFields}}
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
                <Form noValidate onSubmit={handleSubmit}>

                  <Form.Group>
                    <Form.Label>name</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='company name'
                      aria-describedby='inputGroupPrepend'
                      name='name'
                      value={values.name}
                      onChange={handleChange}
                      isInvalid={!!errors.name}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>address</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Addressname 1 X 23'
                      aria-describedby='inputGroupPrepend'
                      name='address'
                      value={values.address}
                      onChange={handleChange}
                      isInvalid={!!errors.address}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>postal code</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='00100 Cityname'
                      aria-describedby='inputGroupPrepend'
                      name='postalCode'
                      value={values.postalCode}
                      onChange={handleChange}
                      isInvalid={!!errors.postalCode}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>phone number</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='010 1234567'
                      aria-describedby='inputGroupPrepend'
                      name='phone'
                      value={values.phone}
                      onChange={handleChange}
                      isInvalid={!!errors.phone}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>company id</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='1234567-1'
                      aria-describedby='inputGroupPrepend'
                      name='companyId'
                      value={values.companyId}
                      onChange={handleChange}
                      isInvalid={!!errors.companyId}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>about</Form.Label>
                    <Form.Control
                      type='text'
                      as='textarea'
                      rows='4'
                      placeholder='about our company X for linebreak'
                      aria-describedby='inputGroupPrepend'
                      name='about'
                      value={values.about}
                      onChange={handleChange}
                      isInvalid={!!errors.about}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>coordinates for google maps</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='latitude,longitude'
                      aria-describedby='inputGroupPrepend'
                      name='coords'
                      value={values.coords}
                      onChange={handleChange}
                      isInvalid={!!errors.coords}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.File
                      name='logo'
                      label="logo image"
                      type='file'
                      onChange={(event) => {
                        setFieldValue("logo", event.currentTarget.files[0]);
                      }}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.File
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

        </div>

      </Container>
    </>
  )
}

export default CompanyInfoForm