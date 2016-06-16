# Getting started

## About React-Leaflet

This library provides an abstraction of [Leaflet](http://leafletjs.com/) as [React components](https://facebook.github.io/react/).  
It does not replace Leaflet, only leverages [React's lifecycle methods](https://facebook.github.io/react/docs/component-specs.html#lifecycle-methods) to call the relevant Leaflet handlers. You can read more information about the lifecycle process in the [How it works](How%20it%works.md) page of this documentation.
Please make sure you understand all the [TODO: link technical considerations]() to evaluate if this library is appropriate for your needs.

React-Leaflet allows to convert this [sample code from Leaflet documentation](http://leafletjs.com/):

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

to React components:

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

You can run an example code using React-Leaflet in [this jsfiddle](https://jsfiddle.net/paul_lecam/q2v7t59h/).

## Leaflet setup

If you are not familiar with Leaflet, make sure you read its [quick start guide](http://leafletjs.com/examples/quick-start.html) before using this library.  
You will need to add its CSS to your page to render the map properly.

All components are React wrappers for Leaflet elements and layers, they need a map instance and therefore must be included in a top-level `<Map>` component.

## Installation

### Using npm

```bash
npm install react-leaflet
```

React, ReactDOM and Leaflet are peer dependencies, if you haven't already installed them use:

```bash
npm install leaflet react react-dom react-leaflet
```

### UMD

An UMD build is available on [npmcdn](https://npmcdn.com/):

```html
<script src="https://npmcdn.com/react-leaflet/dist/react-leaflet.min.js"></script>
```

The library is injected as `window.ReactLeaflet`.
