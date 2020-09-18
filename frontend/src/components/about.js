import React from 'react'
import { Container, Image } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import Loading from './loading'


const AboutInfo = ({ info }) => {

  return (
    <>

      {info.images.map((img, i) =>
        <div key={i}>
          <Image className='infoImg' src={img} alt='no image found.'></Image>
        </div>
      )}

      {info.about.map((info, i) =>
        <div key={i}>
          <p>{info}</p>
        </div>
      )}

    </>
  )
}

const About = ({ title }) => {

  const companyInfo = useSelector(state => state.info)

  return (
    <>
      <Container>
        {!companyInfo
          ?
          <Loading />
          :
          <>
            <h2 className='pageTitle'>{title}</h2>

            <div className='fastFadeIn'>
              <AboutInfo info={companyInfo} />
            </div>
          </>
        }
      </Container>
    </>
  )
}

export default About