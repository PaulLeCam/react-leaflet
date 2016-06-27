# Upgrading

## Leaflet v1.0 (in progress)

TODO

## v0.12.0

**Deprecated:** the `getLeafletElement()` method on components is deprecated, you can simply use the `leafletElement` property instead.

The major change in this version is the use of [context](https://facebook.github.io/react/docs/context.html) instead of props to pass Leaflet instances from components to their children.  
If you are only using the components provided by React-Leaflet, everything should continue to work as before.

If you are using custom components, you may have to update your code to provide or access the `map`, `layerContainer` and `popupContainer` using context.  
For example, using React-Leaflet < 0.12, you would need to do:

```js
// layerContainer and map need to be passed to Marker
const MyPopupMarker = ({ layerContainer, map, position, children }) => (
  <Marker layerContainer={layerContainer} map={map} position={position}>
    <Popup>
      <span>{children}</span>
    </Popup>
  </Marker>
)

// layerContainer and map need to be passed through to its children
const MyMarkersList = ({ layerContainer, map, markers }) => {
  const items = markers.map(({ key, ...props }) => (
      <MyPopupMarker key={key} layerContainer={layerContainer} map={map} {...props} />
  ))
  return <div style={{display: 'none'}}>{items}</div>
}

const CustomComponent = () => {
  const markers = [
    {key: 'marker1', position: [51.5, -0.1], children: 'My first popup'},
    {key: 'marker2', position: [51.51, -0.1], children: 'My second popup'},
    {key: 'marker3', position: [51.49, -0.05], children: 'My third popup'},
  ]
  return (
    <Map center={[51.51, -0.1]} zoom={10}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      />
      <MyMarkersList markers={markers} />
    </Map>
  )
}
```

Using React-Leaflet >= 0.12, it becomes simpler:

```js
// Marker will get `layerContainer` and `map` from context
const MyPopupMarker = ({ children, position }) => (
  <Marker position={position}>
    <Popup>
      <span>{children}</span>
    </Popup>
  </Marker>
)

// No need to inject `layerContainer` and `map` props to the children
const MyMarkersList = ({ markers }) => {
  const items = markers.map(({ key, ...props }) => (
    <MyPopupMarker key={key} {...props} />
  ))
  return <div style={{display: 'none'}}>{items}</div>
}
```
