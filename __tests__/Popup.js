/* eslint-disable react/no-did-mount-set-state, react/no-did-update-set-state */

import React from 'react';
import { render } from 'react-dom';

jest.dontMock('../src/BaseTileLayer');
jest.dontMock('../src/MapComponent');
jest.dontMock('../src/MapControl');
jest.dontMock('../src/MapLayer');
jest.dontMock('../src/Map');
jest.dontMock('../src/Marker');
jest.dontMock('../src/Popup');
jest.dontMock('../src/TileLayer');
jest.dontMock('../src/index');
jest.dontMock('../src/Path');
jest.dontMock('../src/types/bounds');
jest.dontMock('../src/types/index');
jest.dontMock('../src/types/latlng');

const { Map, Popup, TileLayer } = require('../src/');

describe('Popup', () => {
  it('adds the popup to the map', () => {
    const position = [0, 0];
    const component = (
      <Map center={position} zoom={10}>
        <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
        <Popup position={position}>
          <span>Test Popup</span>
        </Popup>
      </Map>
    );

    document.body.innerHTML = '<div id="test"></div>';
    render(component, document.getElementById('test'));

    expect(document.querySelector('#test .leaflet-popup-content span').textContent).toBe('Test Popup');
  });

  it('adds and removes the popup on the map', () => {
    const getNode = () => {
      return document.querySelector('#test .leaflet-popup-content span');
    };

    class Component extends React.Component {
      constructor() {
        super();
        this.state = {
          show: false,
          test: true,
        };
      }

      componentDidMount() {
        expect(getNode()).toBe(null);
        this.setState({show: true});
      }

      componentDidUpdate() {
        if (this.state.test) {
          expect(getNode()).toBeDefined();
          this.setState({
            show: false,
            test: false,
          });
        }
        else {
          expect(getNode()).toBe(null);
        }
      }

      render() {
        const position = [0, 0];
        const popup = this.state.show
          ? <Popup position={position}>
              <span>Test Popup</span>
            </Popup>
          : null;

        return (
          <Map center={position} ref='map' zoom={10}>
            <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
            {popup}
          </Map>
        );
      }
    }

    document.body.innerHTML = '<div id="test"></div>';
    render(<Component />, document.getElementById('test'));
  });
});
