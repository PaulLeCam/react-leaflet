import Leaflet from 'leaflet';
import React from 'react';
import { render } from 'react-dom';

jest.autoMockOff();

const LayersControl = require('../src/LayersControl').default;
const Map = require('../src/Map').default;

describe('LayersControl', () => {
  it('passes its `map` prop to its children', () => {
    document.body.innerHTML = '<div id="test"></div>';

    class ChildComponent extends React.Component {
      static propTypes = {
        map: React.PropTypes.instanceOf(Leaflet.Map)
      };

      componentWillMount() {
        expect(this.props.map).toBeDefined();
      }

      render() {
        return null;
      }
    }

    const component = (
      <Map>
        <LayersControl>
          <LayersControl.Overlay checked name='test'>
            <ChildComponent />
          </LayersControl.Overlay>
        </LayersControl>
      </Map>
    );

    render(component, document.getElementById('test'));
  });
});
