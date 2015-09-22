import React from 'react';
import { findDOMNode, render } from 'react-dom';
import { renderToStaticMarkup } from 'react-dom/server';

jest.dontMock('../BoundsMap');
jest.dontMock('../Map');
jest.dontMock('../MapComponent');

const BoundsMap = require('../BoundsMap');

describe('BoundsMap', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="test"></div>';
  });

  it('only renders the container div server-side', () => {
    class Component extends React.Component {
      render() {
        return <span>test</span>;
      }
    }
    const component = <BoundsMap><Component /></BoundsMap>;
    const html = renderToStaticMarkup(component, document.getElementById('test'));

    expect(html).toBe('<div id="map1"></div>');
  });

  it('initializes the map in the rendered container', () => {
    const component = <BoundsMap />;
    const instance = render(component, document.getElementById('test'));
    const node = findDOMNode(instance);

    expect(node._leaflet).toBe(true);
  });

  it('sets bounds', () => {
    const bounds = [[0, 0], [2, 2]];

    const component = <BoundsMap bounds={bounds} />;
    const instance = render(component, document.getElementById('test'));
    const mapLeaflet = instance.leafletElement;

    expect(mapLeaflet.getCenter().lat).toBeCloseTo(1);
    expect(mapLeaflet.getCenter().lng).toBeCloseTo(1);
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
        return <BoundsMap bounds={this.state.bounds} ref='map' />;
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
