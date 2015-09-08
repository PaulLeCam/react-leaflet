import { PropTypes } from 'react';
import { featureGroup } from 'leaflet';

import Path from './Path';

export default class FeatureGroup extends Path {
  static propTypes = {
    layers: PropTypes.array.isRequired,
  };

  componentWillMount() {
    const { layers, map, ...props } = this.props;
    this.leafletElement = featureGroup(layers);
  }

  componentDidUpdate(prevProps) {
    this.setStyleIfChanged(prevProps, this.props);
  }
}
