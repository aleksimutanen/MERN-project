import React from 'react'

import { useSelector } from 'react-redux'

const Footer = () => {

  const info = useSelector(state => state.info)

  if (!info) return ''

  const date = new Date()

  return (
    <div className='footer border-top border-dark'>
      <br></br>
      <p>&copy; {date.getFullYear()}, {info.name}.</p>
    </div>
  )
}


export default Footer