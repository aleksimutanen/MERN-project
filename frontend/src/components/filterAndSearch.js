import React from 'react'
import { Form, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { setDefaultIndex } from '../reducers/pageIndexReducer'
import { setFilter } from '../reducers/filterReducer'
import { setSearch } from '../reducers/searchReducer'


const ProjectFilter = () => {

  const dispatch = useDispatch()

  const filter = useSelector(state => state.filter.listName)
  const search = useSelector(state => state.search)

  return (
    <>
    {/* <style type="text/css">
    {`
    .option:hover {
      background-color: purple;
      color: white;
    }
    `}
  </style> */}

      <Form.Group as={Row}>
        
        <Form.Label column md='auto'>Filter by</Form.Label>

        <Col md='auto'>
          <Form.Control as='select'
          bsCustomPrefix
            defaultValue={filter}
            onChange={(event) => {
              dispatch(setDefaultIndex());
              dispatch(setFilter(event.target.value));
            }}
          >

            {/* <option className='dropOption bg-dark '>all</option> */}
            <option>all</option>
            <option>houses</option>
            <option>offices</option>
            <option>zones</option>
            <option>competitions</option>
            <option>facades</option>
            <option>parking complexes</option>
            <option>design phase</option>
            <option>construction phase</option>
            <option>finished</option>

          </Form.Control>
        </Col>

        <Form.Label column md='auto'>Search</Form.Label>

        <Col md='auto'>
          <Form.Control
            type='text'
            placeholder='search for project name'
            defaultValue={search}
            onChange={(event) => {
              dispatch(setDefaultIndex());
              dispatch(setSearch(event.target.value));
            }}
          />
        </Col>
      </Form.Group>

    </>
  )
}

export default ProjectFilter