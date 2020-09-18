import React from 'react'
import { Image, Container } from 'react-bootstrap'

import img from '../images/bg.jpg'


const Home = () => {

  return (
    <>
      <Container fluid>

        <div className='fastFadeIn'>
          <Image className='homeImg' src={img} alt='xd' />
          {/* <Image className='homeImg' src='hue.jpg' alt='xd' /> */}
        </div>

      </Container>
    </>
  )
}

export default Home