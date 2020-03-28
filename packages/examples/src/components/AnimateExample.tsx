import React, { RefObject, useRef } from 'react'
import { MapContainer, TileLayer, useMapEvent } from 'react-leaflet'

interface Props {
  animateRef: RefObject<boolean>
}

function SetViewOnClick({ animateRef }: Props) {
  const map = useMapEvent('click', (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current || false,
    })
  })

  return null
}

export default function AnimateExample() {
  const animateRef = useRef(false)

  return (
    <div style={{ textAlign: 'center' }}>
      <label>
        <input
          type="checkbox"
          onChange={() => {
            animateRef.current = !animateRef.current
          }}
        />
        Animate panning
      </label>
      <MapContainer center={[51.505, -0.09]} zoom={13}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SetViewOnClick animateRef={animateRef} />
      </MapContainer>
    </div>
  )
}
