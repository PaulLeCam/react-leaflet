import React from 'react';
import { findDOMNode, render } from 'react-dom';
import { renderToStaticMarkup } from 'react-dom/server';

jest.dontMock('../src/Map');
jest.dontMock('../src/MapComponent');
jest.dontMock('../src/types/bounds');
jest.dontMock('../src/types/index');
jest.dontMock('../src/types/latlng');

const Map = require('../src/Map').default;

describe('Map', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="test"></div>';
  });

  it('only renders the container div server-side', () => {
    class Component extends React.Component {
      render() {
        return <span>test</span>;
      }
    }
    const component = <Map><Component /></Map>;
    const html = renderToStaticMarkup(component, document.getElementById('test'));

    expect(html).toBe('<div id="map1"></div>');
  });

  it('initializes the map in the rendered container', () => {
    const component = <Map />;
    const instance = render(component, document.getElementById('test'));
    const node = findDOMNode(instance);

    expect(node._leaflet).toBe(true);
  });

  it('sets center and zoom props', () => {
    const center = [1.2, 3.4];
    const zoom = 10;

    const component = <Map center={center} zoom={zoom} />;
    const instance = render(component, document.getElementById('test'));
    const mapLeaflet = instance.leafletElement;

    expect(mapLeaflet.getCenter().lat).toBe(center[0]);
    expect(mapLeaflet.getCenter().lng).toBe(center[1]);
    expect(mapLeaflet.getZoom()).toBe(zoom);
  });

  it('sets bounds', () => {
    const bounds = [[0, 0], [2, 2]];
    const component = <Map bounds={bounds} />;
    const instance = render(component, document.getElementById('test'));
    const mapLeaflet = instance.leafletElement;

    expect(mapLeaflet.getCenter().lat).toBeCloseTo(1);
    expect(mapLeaflet.getCenter().lng).toBeCloseTo(1);
  });

  it('updates center and zoom props', () => {
    class Component extends React.Component {
      constructor() {
        super();
        this.state = {
          center: [1.2, 3.4],
          zoom: 10,
        };
      }
      getLeafletMap() {
        return this.refs.map.leafletElement;
      }
      updatePosition() {
        this.setState({
          center: [2.3, 4.5],
          zoom: 12,
        });
      }
      render() {
        return <Map center={this.state.center} ref='map' zoom={this.state.zoom} />;
      }
    }
    const instance = render(<Component />, document.getElementById('test'));
    const mapLeaflet = instance.getLeafletMap();

    expect(mapLeaflet.getCenter().lat).toBe(1.2);
    expect(mapLeaflet.getCenter().lng).toBe(3.4);
    expect(mapLeaflet.getZoom()).toBe(10);

    instance.updatePosition();
    expect(mapLeaflet.getCenter().lat).toBe(2.3);
    expect(mapLeaflet.getCenter().lng).toBe(4.5);
    expect(mapLeaflet.getZoom()).toBe(12);
  });

  it('updates bounds props', () => {
    class Component extends React.Component {
      constructor() {
        super();
        this.state = {
          bounds: [[0, 0], [2, 2]],
        };
      }
      getLeafletMap() {
        return this.refs.map.leafletElement;
      }
      updatePosition() {
        this.setState({
          bounds: [[0, 0], [-2, -2]],
        });
      }
      render() {
        return <Map bounds={this.state.bounds} ref='map' />;
      }
    }
    const instance = render(<Component />, document.getElementById('test'));
    const mapLeaflet = instance.getLeafletMap();

    expect(mapLeaflet.getCenter().lat).toBeCloseTo(1);
    expect(mapLeaflet.getCenter().lng).toBeCloseTo(1);

    instance.updatePosition();
    expect(mapLeaflet.getCenter().lat).toBeCloseTo(-1);
    expect(mapLeaflet.getCenter().lng).toBeCloseTo(-1);
  });

});
