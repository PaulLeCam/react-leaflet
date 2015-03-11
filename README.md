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

React and Leaflet are peer dependencies, if you haven't already installed them use:

```bash
npm install leaflet react react-leaflet
```

## Getting started

All components are React wrappers for Leaflet elements and layers, they need a map instance and therefore must be included in a top-level `<Map>` component.

**Leaflet example**
```js
import L from "leaflet";

const position = [51.505, -0.09];
const map = L.map("map").setView(position, 13);

L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker(position).addTo(map)
  .bindPopup("A pretty CSS3 popup. <br> Easily customizable.");
```

**React-Leaflet**
```js
import React from "react";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";

const position = [51.505, -0.09];
const map = <Map center={position} zoom={13}>
  <TileLayer
    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  />
  <Marker position={position}>
    <Popup>
      <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
    </Popup>
  </Marker>
</Map>;

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

**Bounds**: An instance of *Leaflet.LatLngBounds* or a *LatLngList*.

### Events

Leaflet exposes its own events, different from React. You can listen to them using React-Leaflet by adding a callback to a property prefixed by `onLeaflet` or simply `on`. Ex: `<Map onLeafletMoveend={this.handleMoveend}>...</Map>`.  
Check Leaflet documentation for the events associated to each component.

### Components

The properties documented for each component are the ones aimed to be supported (tested and made dynamic when possible) by React-Leaflet.  
All other properties are passed as the `options` argument to their corresponding Leaflet element and should work fine for static maps, it is however unlikely that they would updated if you change them afterwards.

You can directly access the Leaflet element created by a component using the `leafletElement` property on this component. This leaflet element is usually created in `componentWillMount()`, except for the `Map` component where it can only be created after the `<div>` container is rendered.

#### Base components

These components are base classes used by other components. They can be extended to create custom components but should not be used directly.

##### MapComponent

Base class extending `React.Component` and handling events binding and unbind.  
It exposes a `leafletElement` property to access the `Leaflet` object created for the component.

##### MapLayer

Base class extending `MapComponent` using the provided `map` prop to add its element and passing it down to its children.

##### BaseTileLayer

Base class extending `MapLayer` with a `render()` method and handling a TitleLayer `opacity` and `zIndex` props.

##### PopupContainer

Base class extending `MapLayer` with a `render()` method passing its `leafletElement` to its children as the `popupContainer` prop.

#### Map

This is the top-level component that must be mounted for children ones to be rendered. Refer to Leaflet documentation for more information about the properties.

**Properties**
- `center` (optional LatLng, dynamic): Center of the map. This property is dynamic, if you change it it will be reflected in the map.
- `id` (optional String): The ID of the `<div>` container for the map. If you don't provide it, a unique one will be created.
- `maxBounds` (optional Bounds)
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

##### ImageOverlay

- `url` (required String, dynamic)
- `opacity` (optional Number, dynamic)
- `attribution` (optional String)

##### Implemented but needing testing and documentation

- CanvasTileLayer
- WMSTileLayer

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

- `bounds` (required Bounds, dynamic)

#### Other Layers

##### Implemented but needing testing and documentation

- FeatureGroup
- GeoJson

## Changelog

### v0.4.0-rc.1 (11/03/15)

React 0.13.0.

### v0.4.0-beta.1 (08/03/15)

- Updated React dependency to 0.13.0-rc2:
  - Components are defined as ES6 classes.
  - Mixins are replaced by the base components `MapComponent`, `MapLayer`, `BaseTileLayer` and `PopupContainer`. All components extend from these.
  - The new [`React.cloneElement()`](https://facebook.github.io/react/blog/2015/03/03/react-v0.13-rc2.html#react.cloneelement) API is used instead of the deprecated `React.addons.cloneWithProps()` to pass the `map` property to the components.
  - The `map` property has been removed from the components `propTypes` definition as it is dynamically injected to its children by the `Map` component, React would [now warn it is not set](https://facebook.github.io/react/blog/2015/02/24/streamlining-react-elements.html#solution-early-proptype-warnings). It is still required by components to have access to the Leaflet object.
- Events can now be set as `on{Event}` rather than `onLeaflet{Event}`, ex `onClick` instead of `onLeafletClick`, as all events are proxied to Leaflet.
- Deprecated `getLeafletElement()` method, simply use the `leafletElement` property instead to access the Leaflet object created for a component.

## License

MIT  
See LICENSE file.
