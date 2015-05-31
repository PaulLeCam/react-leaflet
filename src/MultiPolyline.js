import { PropTypes } from 'react';
import { multiPolyline } from 'leaflet';

import latlngListType from './types/latlngList';
import PopupContainer from './PopupContainer';

export default class MultiPolyline extends PopupContainer {
  static propTypes = {
    polylines: PropTypes.arrayOf(latlngListType).isRequired
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
  }
}
