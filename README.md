React-Leaflet
=============

React components for Leaflet maps.

### Work in progress

In development, use at your own risks.  
Tests and documentation still being worked on.

## Install

```bash
npm install react-leaflet
```

## Getting started

All components are React wrappers for Leaflet elements and layers, they need a map instance and therefore must be included in a top-level `<Map>` component.

**Leaflet example**
```js
var L = require("leaflet");

var position = [51.505, -0.09];
var map = L.map("map").setView(position, 13);

L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker(position).addTo(map)
  .bindPopup("A pretty CSS3 popup. <br> Easily customizable.");
```

**React-Leaflet**
```js
var React = require("react");
var {Map, Marker, Popup, TileLayer} = require("react-leaflet");

var position = [51.505, -0.09];
var map = (
  <Map center={position} zoom={13}>
    <TileLayer
      url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    <Marker position={position}>
      <Popup>A pretty CSS3 popup. <br/> Easily customizable.</Popup>
    </Marker>
  </Map>
);

React.render(map, document.getElementById("map-container"));
```
Note that the `<Map>` component creates its own `<div>` container for the map, it does not get attached to an existing node.

## Known limitations

- At this point, not all layers are implemented and even less tested.
- Properties on most components are static: they are set during the first render but not updated when the component updates. Check the documentation and source code to know what properties are dynamic.

## API

### PropTypes

**LatLng**: One of `[Number, Number]`, `{lat: Number, lng: Number}` or `{lat: Number, lon: Number}`.

**LatLngList**: An Array of *LatLng*.

### Events

Leaflet exposes its own events, different from React. You can listen to them using React-Leaflet by adding a callback to a property prefixed by `onLeaflet`. Ex: `<Map onLeafletMovend={this.handleMoved}>...</Map>`.  
Check Leaflet documentation for the events associated to each component.

### Components

The properties documented for each component are the ones aimed to be supported (tested and made dynamic when possible) by React-Leaflet.  
All other properties are passed as the `options` argument to their corresponding Leaflet element and should work fine for static maps, it is however unlikely that they would updated if you change them afterwards.

You can directly access the Leaflet element created by a component using the `getLeafletElement()` method on this component. This leaflet element is usually created in `componentWillMount()`, except for the `<Map>` component where it can only be created after the `<div>` container is rendered.

#### Map

This is the top-level component that must be mounted for children ones to be rendered. Refer to Leaflet documentation for more information about the properties.

**Properties**
- `center` (optional LatLng, dynamic): Center of the map. This property is dynamic, if you change it it will be reflected in the map.
- `id` (optional String): The ID of the `<div>` container for the map. If you don't provide it, a unique one will be created.
- `maxBounds` (optional LatlngList)
- `maxZoom` (optional Number)
- `minZoom` (optional Number)
- `zoom` (optional Number, dynamic)

#### UI Layers

##### Marker

- `position` (required LatLng, dynamic)

##### Popup

The Popup children will be rendered as its content using `React.renderToStaticMarkup()`, they must be valid React elements.

- `position` (optional LatLng, dynamic)

#### Raster Layers

##### TileLayer

- `url` (required String, dynamic)
- `opacity` (optional Number, dynamic)
- `zIndex` (optional Number, dynamic)

##### Implemented but needing testing and documentation

- CanvasTileLayer
- WMSTileLayer
- ImageOverlay

#### Vector Layers

##### Circle

- `center` (required LatLng, dynamic)
- `radius` (required Number, dynamic)

##### CircleMarker

- `center` (required LatLng, dynamic)
- `radius` (optional Number, dynamic)

##### Polyline

- `positions` (required LatLngList, dynamic)

##### MultiPolyline

- `polylines` (required Array of LatLngList, dynamic)

##### Polygon

- `positions` (required LatLngList, dynamic)

##### MultiPolygon

- `polygons` (required Array of LatLngList, dynamic)

##### Rectangle

- `bounds` (required LatLngList, dynamic)

#### Other Layers

##### Implemented but needing testing and documentation

- FeatureGroup
- GeoJson

## License

MIT  
See LICENSE file.
