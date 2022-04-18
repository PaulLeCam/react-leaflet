---
title: Setup
---

1. Follow all the steps from the [installation page](start-installation.mdx)
1. Add the following code to your app and check it displays correctly:

```tsx
<MapContainer center={[51.505, -0.09]} zoom={13}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[51.505, -0.09]}>
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
