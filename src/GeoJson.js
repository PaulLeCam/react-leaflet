import { PropTypes } from 'react';
import { geoJson } from 'leaflet';

import Path from './Path';

export default class GeoJson extends Path {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  componentWillMount() {
    super.componentWillMount();
    const { data, map, ...props } = this.props;
    this.leafletElement = geoJson(data, props);
  }

  componentDidUpdate(prevProps) {
    this.setStyleIfChanged(prevProps, this.props);
  }
}
