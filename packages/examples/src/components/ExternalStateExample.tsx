import { LatLng, LatLngTuple, Map } from 'leaflet'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'

const center: LatLngTuple = [51.505, -0.09]
const zoom = 13

interface Props {
  map: Map
}

function DisplayPosition({ map }: Props) {
  const [position, setPosition] = useState<LatLng>(map.getCenter())

  const onClick = useCallback(() => {
    map.setView(center, zoom)
  }, [map])

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
      latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{' '}
      <button onClick={onClick}>reset</button>
    </p>
  )
}

export default function ExternalStateExample() {
  const [map, setMap] = useState<Map | null>(null)

  const displayMap = useMemo(
    () => (
      <MapContainer center={center} zoom={zoom} whenCreated={setMap}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
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
