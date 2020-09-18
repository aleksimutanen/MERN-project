import React, { useState, useCallback } from 'react'

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import style from './mapStyle.json'
import { useSelector } from 'react-redux';

const size = {
  width: '100%',
  height: '20vh',
}

const GoogleMaps = () => {

  const companyInfo = useSelector(state => state.info)
  const [map, setMap] = useState(null)

  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

  const location = companyInfo.coords

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLng();
    setMap(bounds)
  }, [])

  const onUnmount = useCallback((map) => {
    setMap(null)
  }, [])

  return (
    <LoadScript
      googleMapsApiKey={API_KEY}
    >

      <GoogleMap
        options
        mapContainerStyle={size}
        options={{styles: style}}
        center={location}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >

        <Marker
          position={location}
        />

      </GoogleMap>
    </LoadScript>
  )
}

export default GoogleMaps