import { PropTypes } from 'react';
import { control } from 'leaflet';

import MapControl from './MapControl';

export default class ZoomControl extends MapControl {
  static propTypes = {
    imperial: PropTypes.bool,
    maxWidth: PropTypes.number,
    metric: PropTypes.bool,
    updateWhenIdle: PropTypes.bool,
  };

  componentWillMount() {
    this.leafletElement = control.scale(this.props);
  }
}
