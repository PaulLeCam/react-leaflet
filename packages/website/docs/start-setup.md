---
title: Setup
---

1. Follow all the steps from the [installation page](start-installation.mdx)
1. Ensure that the leaflet css is included in your project.  E.g. for a typical babel app:

```tsx live
import 'leaflet/dist/leaflet.css'
```

3. Now add the following code to your app and check it displays correctly:

```tsx live
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'

// The default bundler configuration will not work with the way leaflet loads
// its images, so doing this avoids seeing broken image icons.
const markerIcon = new Icon({
    iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]
})

<MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{height: 500}}>
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[51.505, -0.09]} icon={markerIcon})}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
```

If the map is not displayed properly, it is most likely because you haven't followed all the prerequisites.

1. Make sure all dependencies are installed and using supported versions
1. Make sure Leaflet's CSS is loaded
1. Make sure your map container has a defined height

If you're still having trouble, you can use the [`react-leaflet` tag on Stack Overflow](https://stackoverflow.com/questions/tagged/react-leaflet).
