/* global describe, expect, it, jest */

import Leaflet from 'leaflet';
import React, { Component } from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';

import Map from '../src/Map';
import MapLayer from '../src/MapLayer';

jest.unmock('../src/MapComponent');
jest.unmock('../src/MapLayer');
jest.unmock('../src/Map');
jest.unmock('../src/types/bounds');
jest.unmock('../src/types/index');
jest.unmock('../src/types/latlng');

describe('MapLayer', () => {
  it('passes its `map` prop to its children', () => {
    class TestComponent extends MapLayer {
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

    class ChildComponent extends Component {
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

    renderIntoDocument(
      <Map>
        <TestComponent>
          <ChildComponent />
        </TestComponent>
      </Map>
    );
  });
});
