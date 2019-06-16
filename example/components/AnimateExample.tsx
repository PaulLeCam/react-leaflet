import { LatLngExpression } from 'leaflet'
import React, { useCallback, useMemo, useState } from 'react'

import { Map, TileLayer } from '../../src'

export default function AnimateExample() {
  const [animate, setAnimate] = useState(false)
  const [position, setPosition] = useState<LatLngExpression>({
    lat: 51.505,
    lng: -0.09,
  })

  const handleClick = useCallback(e => {
    setPosition(e.latlng)
  }, [])

  const toggleAnimate = useCallback(() => {
    setAnimate(a => !a)
  }, [])

  const map = useMemo(() => {
    return (
      <Map animate={animate} center={position} onClick={handleClick} zoom={13}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </Map>
    )
  }, [position])

  return (
    <div style={{ textAlign: 'center' }}>
      <label>
        <input checked={animate} onChange={toggleAnimate} type="checkbox" />
        Animate panning
      </label>
      {map}
    </div>
  )
}
