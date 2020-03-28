import { LatLng, Map } from 'leaflet'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'

interface Props {
  map: Map
}

function DisplayPosition({ map }: Props) {
  const [position, setPosition] = useState<LatLng>(map.getCenter())

  const onMove = useCallback(() => {
    setPosition(map.getCenter())
  }, [map])

  useEffect(() => {
    map.on('move', onMove)
    return () => {
      map.off('move', onMove)
    }
  }, [map, onMove])

  return (
    <p>
      latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}
    </p>
  )
}

export default function ExternalStateExample() {
  const [map, setMap] = useState<Map | null>(null)

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={{ lat: 51.505, lng: -0.09 }}
        zoom={13}
        whenCreated={setMap}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    ),
    [],
  )

  return (
    <div>
      {map ? <DisplayPosition map={map} /> : null}
      {displayMap}
    </div>
  )
}
