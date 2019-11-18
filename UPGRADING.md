# Upgrading

## v2.6

This release requires [Leaflet v1.6](https://leafletjs.com/2019/11/17/leaflet-1.6.0.html) as peer dependency.

## v2.3

This release requires [Leaflet v1.5](https://leafletjs.com/2019/05/08/leaflet-1.5.0.html) and [React v16.8](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html) as peer dependencies.

## v2.2

This release requires [Leaflet v1.4](https://leafletjs.com/2018/12/30/leaflet-1.4.0.html) as peer dependency.

## v2

This release requires [React v16.3](https://reactjs.org/blog/2018/03/29/react-v-16-3.html) and brings breaking changes in the way the necessary context is propagated. Most third-party plugins and custom components will likely need to be updated in order to access the context.

## v1.8

This release requires [Leaflet v1.3](http://leafletjs.com/2018/01/15/leaflet-1.3.0.html) as peer dependency.

## v1.6

This release makes internal changes to the folders exposed:

- The `src` folder is no longer exported in the npm package, the added `es` one should be consumed instead if you want to support modules.
- The `lib` and `dist` folders are no longer exported in the GitHub repository, use the npm package instead if you need to access them.

## v1.5

This release requires [Leaflet v1.2](http://leafletjs.com/2017/08/08/leaflet-1.2.0.html) as peer dependency.

## v1.4

This release requires [Leaflet v1.1](http://leafletjs.com/2017/06/27/leaflet-1.1.0.html) in order to support the newly added features such as dynamic z-index in `ImageOverlay` and the `VideoOverlay` layer, exposed by React-Leaflet as a component.

The `prop-types` package is now set as a peer dependency rather than a direct dependency, so you will need to add it to your application dependencies if not already set.

## v1.1

This release changes the way Leaflet elements are created and updated internally. If you are only using public APIs, nothing should change, however if you are extending or creating custom components, you should now use the added `createLeafletElement()` and `updateLeafletElement()` methods described in the [Extending](https://github.com/PaulLeCam/react-leaflet/blob/master/docs/Extending.md#extending) section of the documentation rather than overriding the lifecycle hooks directly.\
See the [relevant commit](https://github.com/PaulLeCam/react-leaflet/commit/b42026f9dc93be45f0b8ffc6638a9d3824751091) for more details about the changes involved.

## v1.0

React-Leaflet v1 requires Leaflet v1.0.0 and therefore contains breaking changes from v0.12, based on Leaflet v0.7.\
Make sure to update your Leaflet dependency to v1.0.0, as well as its CSS file.

The following list includes breaking changes upgrading to React-Leaflet v1.0 from v0.12, it may not be exhaustive:

- Renamed `GeoJson` to `GeoJSON` to match Leaflet's change.
- Removed `MultiPolygon` and `MultiPolyline`, now supported by `Polygon` and `Polyline` respectively.
- Removed `CanvasTileLayer`, replaced by `GridLayer`. See [Leaflet's documentation](http://leafletjs.com/reference-1.0.0.html#gridlayer).
- Removed `getLeafletElement()` method in `MapComponent` and `MapControl`, deprecated since v0.12.0.
- Removed `setIconDefaultImagePath()` helper, set `Leaflet.Icon.Default.imagePath` directly using Leaflet if you need.

Read the [changelog](CHANGELOG.md) for more details about these changes.

## v0.12.0

**Drop support for IE <= 10** as explained in [this comment](https://github.com/PaulLeCam/react-leaflet/issues/215#issuecomment-243996907).

**Deprecated:** the `getLeafletElement()` method on components is deprecated, you can simply use the `leafletElement` property instead.

The major change in this version is the use of [context](https://facebook.github.io/react/docs/context.html) instead of props to pass Leaflet instances from components to their children.\
If you are only using the components provided by React-Leaflet, everything should continue to work as before.

If you are using custom components, you may have to update your code to provide or access the `map`, `layerContainer` and `popupContainer` using context.\
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
    <MyPopupMarker
      key={key}
      layerContainer={layerContainer}
      map={map}
      {...props}
    />
  ))
  return <div style={{ display: 'none' }}>{items}</div>
}

const CustomComponent = () => {
  const markers = [
    { key: 'marker1', position: [51.5, -0.1], children: 'My first popup' },
    { key: 'marker2', position: [51.51, -0.1], children: 'My second popup' },
    { key: 'marker3', position: [51.49, -0.05], children: 'My third popup' },
  ]
  return (
    <Map center={[51.51, -0.1]} zoom={10}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
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
  return <div style={{ display: 'none' }}>{items}</div>
}
```
