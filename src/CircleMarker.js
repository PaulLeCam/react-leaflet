import React from "react";
import Leaflet from "leaflet";

import latlngType from "./types/latlng";
import popupContainerMixin from "./mixins/popupContainer";

export default React.createClass({
  displayName: "CircleMarker",

  mixins: [popupContainerMixin],

  propTypes: {
    center: latlngType.isRequired,
    radius: React.PropTypes.number
  },

  componentWillMount() {
    let {center, map, ...props} = this.props;
    this._leafletElement = Leaflet.circleMarker(center, props);
  },

  componentDidUpdate(prevProps) {
    if (this.props.center !== prevProps.center) {
      this.getLeafletElement().setLatLng(this.props.center);
    }
    if (this.props.radius !== prevProps.radius) {
      this.getLeafletElement().setRadius(this.props.radius);
    }
  }
});
