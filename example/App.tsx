import type { LatLngTuple } from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

const position: LatLngTuple = [51.505, -0.09]

export default function App() {
  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>A pretty CSS3 popup.</Popup>
      </Marker>
    </MapContainer>
  )
}
