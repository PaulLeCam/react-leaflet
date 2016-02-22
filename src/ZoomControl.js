import { PropTypes } from 'react';
import { control } from 'leaflet';

import MapControl from './MapControl';

export default class ZoomControl extends MapControl {
  static propTypes = {
    zoomInText: PropTypes.string,
    zoomInTitle: PropTypes.string,
    zoomOutText: PropTypes.string,
    zoomOutTitle: PropTypes.string,
  };

  componentWillMount() {
    this.leafletElement = control.zoom(this.props);
  }
}
