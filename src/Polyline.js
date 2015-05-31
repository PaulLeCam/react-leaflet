import { polyline } from 'leaflet';

import latlngListType from './types/latlngList';
import PopupContainer from './PopupContainer';

export default class Polyline extends PopupContainer {
  static propTypes = {
    positions: latlngListType.isRequired
  };

  componentWillMount() {
    super.componentWillMount();
    const { map, positions, ...props } = this.props;
    this.leafletElement = polyline(positions, props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.positions !== prevProps.positions) {
      this.leafletElement.setLatLngs(this.props.positions);
    }
  }
}
