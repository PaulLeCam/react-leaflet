import { PropTypes } from 'react';
import { geoJson } from 'leaflet';

import PopupContainer from './PopupContainer';

export default class GeoJson extends PopupContainer {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  componentWillMount() {
    super.componentWillMount();
    const { data, map, ...props } = this.props;
    this.leafletElement = geoJson(data, props);
  }
}
