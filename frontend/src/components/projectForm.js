import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setForm } from '../reducers/formstateReducer'
import { Form } from 'react-bootstrap'

import HouseFields from './fields/houseFields'
import ParkingFields from './fields/parkingComplexFields'
import FacadeFields from './fields/facadeFields'
import OfficeFields from './fields/officeFields'
import ZoneFields from './fields/zoneFields'
import CompetitionFields from './fields/competitionFields'


const FormType = ({form, sendFields, project}) => {
  if (form === 'house') return <HouseFields sendFields={sendFields} project={project} />
  if (form === 'parkingComplex') return <ParkingFields sendFields={sendFields} project={project} />
  if (form === 'facade') return <FacadeFields sendFields={sendFields} project={project} />
  if (form === 'office') return <OfficeFields sendFields={sendFields} project={project} />
  if (form === 'zone') return <ZoneFields sendFields={sendFields} project={project} />
  if (form === 'competition') return <CompetitionFields sendFields={sendFields} project={project} />
}

const ProjectForm = ({ sendForm, title, project }) => {
  const dispatch = useDispatch()

  const form = useSelector(state => state.formstate)

  const sendFields = async (obj, formData, {resetForm}) => {
    sendForm(obj, formData, {resetForm})
  }

  return (
    <>

      <h2 className='pageTitle'>{title}</h2>

      <div className='fastFadeIn'>

        <Form.Group>
          <Form.Label>type</Form.Label>
          <Form.Control
            name='type'
            as='select'
            className='formSelection'
            value={form}
            onChange={(event) => dispatch(setForm(event.target.value))}
          >
            <option className='optionStyle'>house</option>
            <option className='optionStyle'>parkingComplex</option>
            <option className='optionStyle'>facade</option>
            <option className='optionStyle'>office</option>
            <option className='optionStyle'>zone</option>
            <option className='optionStyle'>competition</option>

            {/* <option>house</option>
          <option>parkingComplex</option>
          <option>facade</option>
          <option>office</option>
          <option>zone</option>
          <option>competition</option> */}
          
          </Form.Control>
        </Form.Group>

        <FormType form={form} sendFields={sendFields} project={project} />

      </div>
    </>
  )
}

export default ProjectForm