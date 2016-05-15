/* global describe, expect, it, jest */

import React, { Component } from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';
import { renderToStaticMarkup } from 'react-dom/server';

import Map from '../src/Map';

jest.unmock('../src/Map');
jest.unmock('../src/MapComponent');
jest.unmock('../src/types/bounds');
jest.unmock('../src/types/index');
jest.unmock('../src/types/latlng');

describe('Map', () => {
  it('only renders the container div server-side', () => {
    class TestComponent extends Component {
      render() {
        return <span>test</span>;
      }
    }
    const component = <Map><TestComponent /></Map>;
    const html = renderToStaticMarkup(component);

    expect(html).toBe('<div id="map1"></div>');
  });

  it('sets center and zoom props', () => {
    const center = [1.2, 3.4];
    const zoom = 10;

    const map = renderIntoDocument(<Map center={center} zoom={zoom} />);
    const mapLeaflet = map.leafletElement;

    expect(mapLeaflet.getCenter().lat).toBe(center[0]);
    expect(mapLeaflet.getCenter().lng).toBe(center[1]);
    expect(mapLeaflet.getZoom()).toBe(zoom);
  });

  it('sets bounds', () => {
    const bounds = [[0, 0], [2, 2]];
    const map = renderIntoDocument(<Map bounds={bounds} />)
    const mapBounds = map.leafletElement.getBounds();
    expect(mapBounds).toBe(bounds);
  });

  it('updates center and zoom props', () => {
    class TestComponent extends Component {
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

    const component = renderIntoDocument(<TestComponent />);
    const mapLeaflet = component.getLeafletMap();

    expect(mapLeaflet.getCenter().lat).toBe(1.2);
    expect(mapLeaflet.getCenter().lng).toBe(3.4);
    expect(mapLeaflet.getZoom()).toBe(10);

    component.updatePosition();
    expect(mapLeaflet.getCenter().lat).toBe(2.3);
    expect(mapLeaflet.getCenter().lng).toBe(4.5);
    expect(mapLeaflet.getZoom()).toBe(12);
  });

  it('updates bounds props', () => {
    const firstBounds = [[0, 0], [2, 2]];
    const secondBounds = [[0, 0], [-2, -2]]

    class TestComponent extends Component {
      constructor() {
        super();
        this.state = {
          bounds: firstBounds,
        };
      }
      getLeafletMap() {
        return this.refs.map.leafletElement;
      }
      updatePosition() {
        this.setState({
          bounds: secondBounds,
        });
      }
      render() {
        return <Map bounds={this.state.bounds} ref='map' />;
      }
    }

    const component = renderIntoDocument(<TestComponent />);
    const mapLeaflet = component.getLeafletMap();

    expect(mapLeaflet.getBounds()).toBe(firstBounds);
    component.updatePosition();
    expect(mapLeaflet.getBounds()).toBe(secondBounds);
  });
});
