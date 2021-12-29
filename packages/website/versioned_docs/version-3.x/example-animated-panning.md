---
title: Animated panning
---

```tsx
import { useRef } from 'react'
import { MapContainer, TileLayer, useMapEvent } from 'react-leaflet'

function SetViewOnClick({ animateRef }) {
  const map = useMapEvent('click', (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current || false,
    })
  })

  return null
}

function AnimateExample() {
  const animateRef = useRef(false)

  return (
    <>
      <p>
        <label>
          <input
            type="checkbox"
            onChange={() => {
              animateRef.current = !animateRef.current
            }}
          />
          Animate panning
        </label>
      </p>
      <MapContainer center={[51.505, -0.09]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SetViewOnClick animateRef={animateRef} />
      </MapContainer>
    </>
  )
}
```
