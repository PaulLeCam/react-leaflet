import { PropTypes } from 'react';
import { control } from 'leaflet';

import MapControl from './MapControl';

export default class LayersControl extends MapControl {
  static propTypes = {
    baseLayers: PropTypes.object,
    overlays: PropTypes.object,
  };

  componentWillMount() {
    const { baseLayers, overlays, ...options } = this.props;
    this.leafletElement = control.layers(baseLayers, overlays, options);
  }
}
