import isUndefined from 'lodash/lang/isUndefined';
import { PropTypes } from 'react';
import Leaflet from 'leaflet';

import boundsType from './types/bounds';

import CenterZoomMap from './Map';


export default class BoundsMap extends CenterZoomMap {
  static propTypes = {
    bounds: boundsType,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    className: PropTypes.string,
    id: PropTypes.string,
    maxBounds: boundsType,
    maxZoom: PropTypes.number,
    minZoom: PropTypes.number,
    style: PropTypes.object,
  };

  componentDidMount() {
    super.componentDidMount();
    if (!isUndefined(this.props.bounds)) {
      this.leafletElement.fitBounds(this.props.bounds);
    }
  }

  componentDidUpdate({ bounds: oldBounds }) {
    const { bounds } = this.props;
    if (!(isUndefined(bounds)) && this.shouldUpdateBounds(bounds, oldBounds)) {
      this.leafletElement.fitBounds(bounds);
    }
  }

  shouldUpdateBounds(next, prev) {
    if (!prev) { return true; }
    const nextLLB = Leaflet.latLngBounds(next);
    const prevLLB = Leaflet.latLngBounds(prev);
    return !nextLLB.equals(prevLLB);
  }
}
