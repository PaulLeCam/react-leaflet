import React from "react";
import Leaflet from "leaflet";

import latlngType from "./types/latlng";
import popupContainerMixin from "./mixins/popupContainer";

export default React.createClass({
  displayName: "Circle",

  mixins: [popupContainerMixin],

  propTypes: {
    center: latlngType.isRequired,
    radius: React.PropTypes.number.isRequired
  },

  componentWillMount() {
    let {center, map, radius, ...props} = this.props;
    this._leafletElement = Leaflet.circle(center, radius, props);
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
