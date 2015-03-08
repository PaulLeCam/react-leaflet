import React from "react";
import Leaflet from "leaflet";

import latlngType from "./types/latlng";
import PopupContainer from "./PopupContainer";

export default class Circle extends PopupContainer {
  componentWillMount() {
    super.componentWillMount();
    const {center, map, radius, ...props} = this.props;
    this.leafletElement = Leaflet.circle(center, radius, props);
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

Circle.propTypes = {
  center: latlngType.isRequired,
  radius: React.PropTypes.number.isRequired
};
