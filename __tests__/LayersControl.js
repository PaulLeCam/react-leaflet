/* global describe, expect, it, jest */

import Leaflet from 'leaflet';
import React, { Component } from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';

import LayersControl from '../src/LayersControl';
import Map from '../src/Map';

jest.unmock('../src/LayersControl');
jest.unmock('../src/Map');
jest.unmock('../src/MapComponent');
jest.unmock('../src/types/bounds');
jest.unmock('../src/types/index');
jest.unmock('../src/types/latlng');

describe('LayersControl', () => {
  it('passes its `map` context to its children', () => {
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
        <LayersControl>
          <LayersControl.Overlay checked name='test'>
            <ChildComponent />
          </LayersControl.Overlay>
        </LayersControl>
      </Map>
    );
  });
});
