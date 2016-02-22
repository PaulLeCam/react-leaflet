import { PropTypes } from 'react';
import { circleMarker } from 'leaflet';

import latlngType from './types/latlng';
import Path from './Path';

export default class CircleMarker extends Path {
  static propTypes = {
    center: latlngType.isRequired,
    radius: PropTypes.number,
  };

  componentWillMount() {
    super.componentWillMount();
    const { center, map, ...props } = this.props;
    this.leafletElement = circleMarker(center, props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.center !== prevProps.center) {
      this.leafletElement.setLatLng(this.props.center);
    }
    if (this.props.radius !== prevProps.radius) {
      this.leafletElement.setRadius(this.props.radius);
    }
    this.setStyleIfChanged(prevProps, this.props);
  }
}
