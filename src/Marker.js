import { PropTypes } from 'react';
import { Icon, marker } from 'leaflet';

import latlngType from './types/latlng';
import PopupContainer from './PopupContainer';

export default class Marker extends PopupContainer {
  static propTypes = {
    position: latlngType.isRequired,
    icon: PropTypes.instanceOf(Icon),
    zIndexOffset: PropTypes.number,
    opacity: PropTypes.number
  };

  componentWillMount() {
    super.componentWillMount();
    const { map, position, ...props } = this.props;
    this.leafletElement = marker(position, props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.position !== prevProps.position) {
      if (!Leaflet.latLng(this.props.position).equals(this.leafletElement.getLatLng())) {
        this.leafletElement.setLatLng(this.props.position);
        if(this.props.layerGroup && this.props.layerGroup.constructor === L.MarkerClusterGroup) {
          this.props.layerGroup.removeLayer(this.leafletElement);
          this.props.layerGroup.addLayer(this.leafletElement);
        }
      }
    }
    if (this.props.icon !== prevProps.icon) {
      this.leafletElement.setIcon(this.props.icon);
    }
    if (this.props.zIndexOffset !== prevProps.zIndexOffset) {
      this.leafletElement.setZIndexOffset(this.props.zIndexOffset);
    }
    if (this.props.opacity !== prevProps.opacity) {
      this.leafletElement.setOpacity(this.props.opacity);
    }
  }
}
