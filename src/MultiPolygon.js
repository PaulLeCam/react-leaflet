import { PropTypes } from 'react';
import { multiPolygon } from 'leaflet';

import latlngListType from './types/latlngList';
import Path from './Path';

export default class MultiPolygon extends Path {
  static propTypes = {
    polygons: PropTypes.arrayOf(latlngListType).isRequired,
  };

  componentWillMount() {
    super.componentWillMount();
    const { map, polygons, ...props } = this.props;
    this.leafletElement = multiPolygon(polygons, props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.polygons !== prevProps.polygons) {
      this.leafletElement.setLatLngs(this.props.polygons);
    }
    this.setStyleIfChanged(prevProps, this.props);
  }
}
