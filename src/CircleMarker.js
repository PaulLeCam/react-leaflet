import React from "react";
import Leaflet from "leaflet";

import latlngType from "./types/latlng";
import PopupContainer from "./PopupContainer";

export default class CircleMarker extends PopupContainer {
  componentWillMount() {
    super.componentWillMount();
    const {center, map, ...props} = this.props;
    this.leafletElement = Leaflet.circleMarker(center, props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.center !== prevProps.center) {
      this.leafletElement.setLatLng(this.props.center);
    }
    if (this.props.radius !== prevProps.radius) {
      this.leafletElement.setRadius(this.props.radius);
    }
  }
}

CircleMarker.propTypes = {
  center: latlngType.isRequired,
  radius: React.PropTypes.number
};
