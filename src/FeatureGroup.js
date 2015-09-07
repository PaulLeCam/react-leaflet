import { PropTypes } from 'react';
import { featureGroup } from 'leaflet';

import PopupContainer from './PopupContainer';

export default class FeatureGroup extends PopupContainer {
  static propTypes = {
    layers: PropTypes.array.isRequired,
  };

  componentWillMount() {
    const { layers, map, ...props } = this.props;
    this.leafletElement = featureGroup(layers);
  }
}
