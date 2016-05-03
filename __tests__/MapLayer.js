import Leaflet from 'leaflet';
import React from 'react';
import { render } from 'react-dom';

jest.dontMock('../src/MapComponent');
jest.dontMock('../src/MapLayer');
jest.dontMock('../src/Map');
jest.dontMock('../src/types/bounds');
jest.dontMock('../src/types/index');
jest.dontMock('../src/types/latlng');

const MapLayer = require('../src/MapLayer').default;
const Map = require('../src/Map').default;

describe('MapLayer', () => {
  it('passes its `map` prop to its children', () => {
    document.body.innerHTML = '<div id="test"></div>';

    class Component extends MapLayer {
      static propTypes = {
        map: React.PropTypes.instanceOf(Leaflet.Map),
      };

      componentWillMount() {
        super.componentWillMount();
        expect(this.props.map).toBeDefined();
        this.leafletElement = Leaflet.marker([0, 0]);
      }

      render() {
        const children = this.getClonedChildrenWithProps({parent: true});
        return <div>{children}</div>;
      }
    }

    class ChildComponent extends React.Component {
      static propTypes = {
        map: React.PropTypes.instanceOf(Leaflet.Map),
        parent: React.PropTypes.bool,
      };

      componentWillMount() {
        expect(this.props.map).toBeDefined();
        expect(this.props.parent).toBe(true);
      }

      render() {
        return null;
      }
    }

    const component = (
      <Map>
        <Component>
          <ChildComponent />
        </Component>
      </Map>
    );

    render(component, document.getElementById('test'));
  });
});
