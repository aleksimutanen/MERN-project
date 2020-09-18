import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loading = () => {

  return (
    <div className='spinnerParent'>
      <h4>Loading..<Spinner className='spinner' animation="grow" /></h4>
    </div>
  )
}

export default Loading