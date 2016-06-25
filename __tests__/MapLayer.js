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
  it('passes its `map` context to its children', () => {
    class TestComponent extends MapLayer {
      static contextTypes = {
        map: React.PropTypes.instanceOf(Leaflet.Map),
      };

      componentWillMount() {
        super.componentWillMount();
        expect(this.context.map).toBeDefined();
        this.leafletElement = Leaflet.marker([0, 0]);
      }

      render() {
        return <div>{this.props.children}</div>;
      }
    }

    class ChildComponent extends Component {
      static contextTypes = {
        map: React.PropTypes.instanceOf(Leaflet.Map),
      };

      componentWillMount() {
        expect(this.context.map).toBeDefined();
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
