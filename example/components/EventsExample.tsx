import React, { useMemo, useRef, useState } from 'react'

import { Map, TileLayer, Marker, Popup } from '../../src'

const DEFAULT_POSITION = { lat: 51.505, lng: -0.09 }

export default function EventsExample() {
  const [position, setPosition] = useState(null)
  const mapRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      click() {
        if (mapRef.current != null) {
          mapRef.current.element.locate()
        }
      },
      locationfound(e) {
        setPosition(e.latlng)
      },
    }),
    [],
  )

  // Memoise the rendered marker
  const marker = useMemo(() => {
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }, [position])

  return (
    <Map
      center={position || DEFAULT_POSITION}
      eventHandlers={eventHandlers}
      ref={mapRef}
      zoom={13}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {marker}
    </Map>
  )
}
