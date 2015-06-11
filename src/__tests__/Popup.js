import React from 'react';

jest.dontMock('../BaseTileLayer');
jest.dontMock('../MapComponent');
jest.dontMock('../MapLayer');
jest.dontMock('../PopupContainer');
jest.dontMock('../Map');
jest.dontMock('../Marker');
jest.dontMock('../Popup');
jest.dontMock('../TileLayer');
jest.dontMock('../index');

const {Map, Marker, Popup, TileLayer} = require('../');

describe('Popup', () => {
  it('adds the popup to the map', () => {
    const position = [0, 0];
    const component = <Map center={position} zoom={10}>
      <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
      <Popup position={position}>
        <span>Test Popup</span>
      </Popup>
    </Map>;

    document.body.innerHTML = '<div id="test"></div>';
    React.render(component, document.getElementById('test'));

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
          test: true
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
            test: false
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
          <Map ref='map' center={position} zoom={10}>
            <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
            {popup}
          </Map>
        );
      }
    }

    document.body.innerHTML = '<div id="test"></div>';
    React.render(<Component />, document.getElementById('test'));
  });
});
