/* global describe, expect, it, jest */
/* eslint-disable react/no-did-mount-set-state, react/no-did-update-set-state */

import Leaflet from 'leaflet';
import React, { Component } from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';

import { Map, Popup, TileLayer } from '../src/';

jest.unmock('../src/BaseTileLayer');
jest.unmock('../src/MapComponent');
jest.unmock('../src/MapControl');
jest.unmock('../src/MapLayer');
jest.unmock('../src/Map');
jest.unmock('../src/Marker');
jest.unmock('../src/Popup');
jest.unmock('../src/TileLayer');
jest.unmock('../src/index');
jest.unmock('../src/Path');
jest.unmock('../src/types/bounds');
jest.unmock('../src/types/index');
jest.unmock('../src/types/latlng');

describe('Popup', () => {
  it('adds the popup to the map', () => {
    let popup;
    const position = [0, 0];

    renderIntoDocument(
      <Map center={position} zoom={10}>
        <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
        <Popup position={position} ref={e => {popup = e;}}>
          <span>Test Popup</span>
        </Popup>
      </Map>
    );

    expect(popup.leafletElement.options.position).toEqual(position);
  });

  it('adds and removes the popup on the map', () => {
    const openOn = jest.genMockFunction();
    const removeLayer = jest.genMockFunction();

    Leaflet.Map.prototype.removeLayer = removeLayer;
    Leaflet.Popup.prototype.openOn = openOn

    class TestComponent extends Component {
      constructor() {
        super();
        this.state = {
          show: false,
          test: true,
        };
      }

      componentDidMount() {
        expect(openOn.mock.calls.length).toBe(0);
        expect(removeLayer.mock.calls.length).toBe(0);
        this.setState({show: true});
      }

      componentDidUpdate() {
        if (this.state.test) {
          expect(openOn.mock.calls[0][0]).toBe(this.refs.map.leafletElement);
          this.setState({
            show: false,
            test: false,
          });
        }
        else {
          expect(removeLayer.mock.calls[0][0]).toBeDefined();
        }
      }

      render() {
        const position = [0, 0];
        const popup = this.state.show ? (
          <Popup position={position}>
            <span>Test Popup</span>
          </Popup>
        ) : null;

        return (
          <Map center={position} ref='map' zoom={10}>
            <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
            {popup}
          </Map>
        );
      }
    }

    renderIntoDocument(<TestComponent />);
  });
});
