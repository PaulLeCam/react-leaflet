/* global describe, expect, it */

import Leaflet from 'leaflet';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { renderIntoDocument } from 'react-dom/test-utils';

import Map from '../src/Map';
import MapLayer from '../src/MapLayer';

describe('MapLayer', () => {
  it('passes its `map` context to its children', () => {
    class TestComponent extends MapLayer {
      static contextTypes = {
        map: PropTypes.instanceOf(Leaflet.Map),
      };

      createLeafletElement() {
        return Leaflet.marker([0, 0]);
      }

      componentWillMount() {
        super.componentWillMount();
        expect(this.context.map).toBeDefined();
      }

      render() {
        return <div>{this.props.children}</div>;
      }
    }

    class ChildComponent extends Component {
      static contextTypes = {
        map: PropTypes.instanceOf(Leaflet.Map),
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
      </Map>,
    );
  });
});
