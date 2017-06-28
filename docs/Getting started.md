# Getting started

## About React-Leaflet

This library provides an abstraction of [Leaflet](http://leafletjs.com/) as [React components](https://facebook.github.io/react/).  
It does not replace Leaflet, only leverages [React's lifecycle methods](https://facebook.github.io/react/docs/component-specs.html#lifecycle-methods) to call the relevant Leaflet handlers. You can read more information about the lifecycle process in the [How it works](How%20it%20works.md) page of this documentation.
Please make sure you understand all the [core concepts](How%20it%20works.md#core-concepts) and [limitations](How%20it%20works.md#limitations) to evaluate if this library is appropriate for your needs.  
This documentation only presents concepts specific to React-Leaflet, you should already be familiar with both React and Leaflet to use this library. Otherwise, please make sure to go through React and Leaflet's getting started guides and examples first.

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

If you are not familiar with Leaflet, make sure you read its [quick start guide](http://leafletjs.com/examples/quick-start/) before using this library.  
You will notably need to add its CSS to your page to render the map properly, and set the height of the `<Map>` container.

All components are React wrappers for Leaflet elements and layers, they need a map instance and therefore must be included in a top-level `<Map>` component.

## Installation

### Using npm or Yarn

```bash
npm install react-leaflet # npm
yarn add react-leaflet # Yarn
```

React, ReactDOM, PropTypes and Leaflet are peer dependencies, if you haven't already installed them you can use:

```bash
npm install leaflet prop-types react react-dom react-leaflet # npm
yarn add leaflet prop-types react react-dom react-leaflet # Yarn
```

### UMD

An UMD build is available on [unpkg](https://unpkg.com/):

```html
<script src="https://unpkg.com/react-leaflet/dist/react-leaflet.min.js"></script>
```

The library is injected as `window.ReactLeaflet`.

## Examples

Different examples are available in the [example folder](../example).  
These examples can be run locally by cloning the repository, installing the dependencies and running `npm run examples` or `yarn run examples` if you're using Yarn.
