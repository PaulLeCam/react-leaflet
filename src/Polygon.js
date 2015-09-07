import { PropTypes } from 'react';
import Leaflet from 'leaflet';

import latlngListType from './types/latlngList';
import PopupContainer from './PopupContainer';

export default class Polygon extends PopupContainer {
  static propTypes = {
    positions: PropTypes.oneOfType([
      latlngListType,
      PropTypes.arrayOf(latlngListType),
    ]).isRequired,
  };

  componentWillMount() {
    super.componentWillMount();
    const { map, positions, ...props } = this.props;
    this.leafletElement = Leaflet.polygon(positions, props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.positions !== prevProps.positions) {
      this.leafletElement.setLatLngs(this.props.positions);
    }
  }
}
