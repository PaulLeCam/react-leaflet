import { LatLngExpression } from 'leaflet'
import React, { useCallback, useRef, useState } from 'react'

import { Map, TileLayer, Marker, Popup } from '../../src'

const center: LatLngExpression = {
  lat: 51.505,
  lng: -0.09,
}

function DraggableMarker() {
  const [draggable, setDraggable] = useState(false)
  const [markerPosition, setMarkerPosition] = useState<LatLngExpression>(center)
  const markerRef = useRef(null)

  const toggleDraggable = useCallback(() => {
    setDraggable(d => !d)
  }, [])

  const updatePosition = useCallback(() => {
    console.log('update position')
    const marker = markerRef.current
    if (marker != null) {
      setMarkerPosition(marker.element.getLatLng())
    }
  }, [])

  return (
    <Marker
      draggable={draggable}
      onDragEnd={draggable ? updatePosition : undefined}
      position={markerPosition}
      ref={markerRef}>
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable ? 'Drag marker' : 'Click to make marker draggable'}
        </span>
      </Popup>
    </Marker>
  )
}

export default function DraggableExample() {
  return (
    <Map center={center} zoom={13}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker />
    </Map>
  )
}
