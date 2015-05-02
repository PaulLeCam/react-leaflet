import React from "react";
import Leaflet from "leaflet";

import latlngType from "./types/latlng";
import PopupContainer from "./PopupContainer";

export default class Marker extends PopupContainer {
  componentWillMount() {
    super.componentWillMount();
    const {map, position, ...props} = this.props;
    this.leafletElement = Leaflet.marker(position, props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.position !== prevProps.position) {
      this.leafletElement.setLatLng(this.props.position);
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

Marker.propTypes = {
  position: latlngType.isRequired,
  icon: React.PropTypes.instanceOf(Leaflet.Icon),
  zIndexOffset: React.PropTypes.number,
  opacity: React.PropTypes.number
};
