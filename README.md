# React-Leaflet

React components for Leaflet maps.

## Install

```bash
npm install react-leaflet
```

React, ReactDOM and Leaflet are peer dependencies, if you haven't already installed them use:

```bash
npm install leaflet react react-dom react-leaflet
```

An UMD build is also available on [npmcdn](https://npmcdn.com/):

```html
<script src="https://npmcdn.com/react-leaflet/dist/react-leaflet.min.js"></script>
```

The library is injected as `window.ReactLeaflet`.

## Getting started

If you are not familiar with Leaflet, make sure you read its [quick start guide](http://leafletjs.com/examples/quick-start.html) first. You will need to add its CSS to your page to render the components properly.

All components are React wrappers for Leaflet elements and layers, they need a map instance and therefore must be included in a top-level `<Map>` component.

**Leaflet example**
```js
import L from 'leaflet';

const position = [51.505, -0.09];
const map = L.map('map').setView(position, 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker(position).addTo(map)
  .bindPopup('A pretty CSS3 popup. <br> Easily customizable.');
```

**React-Leaflet**
```js
import React from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

const position = [51.505, -0.09];
const map = (
  <Map center={position} zoom={13}>
    <TileLayer
      url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    <Marker position={position}>
      <Popup>
        <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
      </Popup>
    </Marker>
  </Map>
);

render(map, document.getElementById('map-container'));
```
Note that the `<Map>` component creates its own `<div>` container for the map, it does not get attached to an existing node.

## Technical considerations

This library uses React components as an interface, but not the virtual DOM, as all the DOM manipulations are managed by Leaflet, so there are a few things to keep in mind when using it:

- Leaflet makes direct calls to the DOM when it is loaded, therefore this library is not compatible with server-side rendering.
- The components exposed are abstractions for Leaflet layers, not DOM elements. Some of them have properties that can be updated directly by calling the setters exposed by Leaflet while others should be completely replaced, by setting an unique value on their `key` property so that they are properly handled by React's algorithm.
- Not all layers are implemented and even less tested.

## API

### Helpers

**setIconDefaultImagePath(path: string)**: Setter for `Leaflet.Icon.Default.imagePath`, set to `//cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images` by default.

### PropTypes

**latLng**: One of `[number, number]`, `{lat: number, lng: number}` or `{lat: number, lon: number}`.

**latLngList**: An Array of *LatLng*.

**bounds**: An instance of *Leaflet.LatLngBounds* or a *LatLngList*.

**controlPosition**: One of `topleft`, `topright`, `bottomleft` or `bottomright`.

### Events

Leaflet exposes its own events, different from React. You can listen to them using React-Leaflet by adding a callback to a property prefixed by `onLeaflet` or simply `on`. Ex: `<Map onLeafletMoveend={this.handleMoveend}>...</Map>`.  
Check Leaflet documentation for the events associated to each component.

### Components

The properties documented for each component are the ones aimed to be supported (tested and made dynamic when possible) by React-Leaflet.  
All other properties are passed as the `options` argument to their corresponding Leaflet element and should work fine for static maps, it is however unlikely that they would updated if you change them afterwards.

You can directly access the Leaflet element created by a component using the `getLeafletElement()` method on this component. This leaflet element is usually created in `componentWillMount()`, except for the `Map` component where it can only be created after the `<div>` container is rendered.

#### Base components

These components are base classes used by other components. They can be extended to create custom components but should not be used directly.

##### MapComponent

Base class extending `React.Component` and handling events binding and unbind.  
It exposes a `getLeafletElement()` method to access the `Leaflet` object created for the component.

##### MapControl

Base class extending `React.Component` for controls.  
It exposes a `getLeafletElement()` method to access the `Leaflet` object created for the control.

##### MapLayer

Base class extending `MapComponent` using the provided `map` prop to add its element and passing it down to its children.  
It exposes the following methods:
- `getClonedChildrenWithMap(object extra): object`: returns the cloned children of the component, adding the `map` and the `extra` props provided to them.
- `renderChildrenWithProps(object props): object`: returns the cloned children of the component using `getClonedChildrenWithMap()`, wrapped in a `<div>` with `display: none` style.

##### BaseTileLayer

Base class extending `MapLayer` with a `render()` method and handling a TitleLayer `opacity` and `zIndex` props.

##### Path

Base class extending `MapLayer` with the following methods:
- `getPathOptions(object props): object`: filters the input `props` and return a new object of [Path options](http://leafletjs.com/reference.html#path-options) properties.
- `setStyle(object options = {}): void`: alias to the Leaflet element [`setStyle()`](http://leafletjs.com/reference.html#path-setstyle).
- `setStyleIfChanged(object fromProps, object toProps): void`: extracts the Path options of the two arguments, and calls `setStyle()` with the new options if different from the previous ones.

#### Map

This is the top-level component that must be mounted for children ones to be rendered. Refer to Leaflet documentation for more information about the properties.

**Properties**
- `bounds: bounds` (optional, dynamic): A rectangle for the map to contain. It will be centered, and the map will zoom in as close as it can while still showing the full bounds. This property is dynamic, if you change it it will be reflected on the map.
- `boundsOptions: object` (optional, dynamic): Options passed to the `fitBounds()` method.
- `center: latLng` (optional, dynamic): Center of the map. This property is dynamic, if you change it it will be reflected in the map.
- `className: string` (optional, dynamic): className property of the `<div>` container for the map.
- `id: string` (optional): The ID of the `<div>` container for the map. If you don't provide it, a unique one will be created.
- `maxBounds: bounds` (optional, dynamic)
- `maxZoom: number` (optional)
- `minZoom: number` (optional)
- `style: object` (optional, dynamic): style property of the `<div>` container for the map.
- `zoom: number` (optional, dynamic)
- `zoomControl: boolean` (optional): Whether the zoom control is added to the map (true by default). 

#### UI Layers

##### Marker

- `position: latLng` (required, dynamic)
- `icon: Leaflet.Icon` (optional, dynamic)
- `zIndexOffset: number` (optional, dynamic)
- `opacity: number` (optional, dynamic)

##### Popup

The Popup children will be rendered using `ReactDOM.render()`, they must be valid React elements.

- `position: latLng` (optional, dynamic)

#### Raster Layers

##### TileLayer

- `url: string` (required, dynamic)
- `opacity: number` (optional, dynamic)
- `zIndex: number` (optional, dynamic)

##### ImageOverlay

- `url: string` (required, dynamic)
- `opacity: number` (optional, dynamic)
- `attribution: string` (optional)

##### Implemented but needing testing and documentation

- CanvasTileLayer
- WMSTileLayer

#### Vector Layers

All vector layers extend the **Path** component and therefore accept dynamic [Path options](http://leafletjs.com/reference.html#path-options) properties.

##### Circle

- `center: latLng` (required, dynamic)
- `radius: number` (required, dynamic)

##### CircleMarker

- `center: latLng` (required, dynamic)
- `radius: number` (optional, dynamic)

##### Polyline

- `positions: latLngList` (required, dynamic)

##### MultiPolyline

- `polylines: array<latLngList>` (required, dynamic)

##### Polygon

- `positions: latLngList | Array<latLngList>` (required, dynamic)

##### MultiPolygon

- `polygons: array<latLngList>` (required, dynamic)

##### Rectangle

- `bounds: bounds` (required, dynamic)

#### Other Layers

##### LayerGroup

Use the `LayerGroup` wrapper component to group children layers together.

##### FeatureGroup

Extended `LayerGroup` supporting a `Popup` child.

##### GeoJson

- `data: GeoJSON` (required)

#### Controls

##### AttributionControl

- `position: controlPosition` (optional, dynamic)
- `prefix: string` (optional)

##### ScaleControl

- `imperial: bool` (optional)
- `position: controlPosition` (optional, dynamic)
- `maxWidth: number` (optional)
- `metric: bool` (optional)
- `updateWhenIdle: bool` (optional)

##### ZoomControl

- `position: controlPosition` (optional, dynamic)
- `zoomInText: string` (optional)
- `zoomInTitle: string` (optional)
- `zoomOutText: string` (optional)
- `zoomOutTitle: string` (optional)

## Creating custom components

If you want to create custom components, for example Leaflet plugins, you could extend one of the [base components](https://github.com/PaulLeCam/react-leaflet#base-components) depending on the type of component you want to implement.  
The created Leaflet map instance is injected by the `Map` component to all its children as the `map` property. Make sure to inject it in your component's children as well.

## Changelog

See [CHANGELOG](https://github.com/PaulLeCam/react-leaflet/blob/master/CHANGELOG.md) file.

## License

MIT  
See [LICENSE](https://github.com/PaulLeCam/react-leaflet/blob/master/LICENSE) file.
