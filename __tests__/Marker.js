/* global describe, expect, it, jest */

import Leaflet from 'leaflet';
import React from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';

import { Map, Marker, TileLayer } from '../src/';

jest.unmock('../src/BaseTileLayer');
jest.unmock('../src/index');
jest.unmock('../src/Map');
jest.unmock('../src/MapComponent');
jest.unmock('../src/MapControl');
jest.unmock('../src/MapLayer');
jest.unmock('../src/Marker');
jest.unmock('../src/Path');
jest.unmock('../src/TileLayer');
jest.unmock('../src/types/bounds');
jest.unmock('../src/types/index');
jest.unmock('../src/types/latlng');

describe('Marker', () => {
  it('adds the marker to the map', () => {
    Leaflet.marker = jest.genMockFunction();
    const position = [0, 0];

    renderIntoDocument(
      <Map center={position} zoom={10}>
        <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
        <Marker position={position} />
      </Map>
    );

    expect(Leaflet.marker.mock.calls[0][0]).toBe(position);
  });
});
