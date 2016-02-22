import React from 'react';
import { render } from 'react-dom';

jest.dontMock('../src/BaseTileLayer');
jest.dontMock('../src/MapComponent');
jest.dontMock('../src/MapControl');
jest.dontMock('../src/MapLayer');
jest.dontMock('../src/Map');
jest.dontMock('../src/TileLayer');
jest.dontMock('../src/Marker');
jest.dontMock('../src/index');
jest.dontMock('../src/Path');
jest.dontMock('../src/types/bounds');
jest.dontMock('../src/types/index');
jest.dontMock('../src/types/latlng');

const { Map, Marker, TileLayer } = require('../src/');

// Stub out a map related function that doesn't work without a real DOM
import Leaflet from 'leaflet';
Leaflet.Map.prototype.getSize = () => {
  return new L.Point(1024, 768);
}


describe('Marker', () => {
  it('adds the marker to the map', () => {

    const position = [0, 0];
    const component = (
      <Map center={position} zoom={10}>
        <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
        <Marker position={position} />
      </Map>
    );

    document.body.innerHTML = '<div id="test"></div>';
    render(component, document.getElementById('test'));

    expect(document.querySelector('#test .leaflet-marker-pane img')).toBeDefined();
  });
});
