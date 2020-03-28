import { LatLngTuple } from 'leaflet'
import React, { useEffect, useRef, useState } from 'react'
import { MapContainer, Pane, Rectangle, TileLayer } from 'react-leaflet'

function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    const id = setInterval(tick, delay)
    return () => {
      clearInterval(id)
    }
  }, [delay])
}

const outer: LatLngTuple[] = [
  [50.505, -29.09],
  [52.505, 29.09],
]
const inner: LatLngTuple[] = [
  [49.505, -2.09],
  [53.505, 2.09],
]

function OtherPane() {
  const [render, setRender] = useState(true)
  useInterval(() => {
    setRender(!render)
  }, 5000)

  return render ? (
    <Pane name="cyan-rectangle" style={{ zIndex: 500 }}>
      <Rectangle bounds={outer} color="cyan" />
    </Pane>
  ) : null
}

export default function PaneExample() {
  return (
    <MapContainer bounds={outer}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <OtherPane />
      <Pane name="yellow-rectangle" style={{ zIndex: 499 }}>
        <Rectangle bounds={inner} pathOptions={{ color: 'yellow' }} />
        <Pane name="purple-rectangle" className="purplePane-purplePane">
          <Rectangle bounds={outer} pathOptions={{ color: 'purple' }} />
        </Pane>
      </Pane>
    </MapContainer>
  )
}
