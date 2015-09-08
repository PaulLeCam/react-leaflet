import { PropTypes } from 'react';
import { multiPolyline } from 'leaflet';

import latlngListType from './types/latlngList';
import Path from './Path';

export default class MultiPolyline extends Path {
  static propTypes = {
    polylines: PropTypes.arrayOf(latlngListType).isRequired,
  };

  componentWillMount() {
    super.componentWillMount();
    const {map, polylines, ...props} = this.props;
    this.leafletElement = multiPolyline(polylines, props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.polylines !== prevProps.polylines) {
      this.leafletElement.setLatLngs(this.props.polylines);
    }
    this.setStyleIfChanged(prevProps, this.props);
  }
}
