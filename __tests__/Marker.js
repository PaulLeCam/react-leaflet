import React from 'react';
import { render } from 'react-dom';

jest.dontMock('../src/BaseTileLayer');
jest.dontMock('../src/MapComponent');
jest.dontMock('../src/MapLayer');
jest.dontMock('../src/PopupContainer');
jest.dontMock('../src/Map');
jest.dontMock('../src/TileLayer');
jest.dontMock('../src/Marker');
jest.dontMock('../src/index');

const { Map, Marker, TileLayer } = require('../src/');

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
