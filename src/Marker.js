import React from "react";
import Leaflet from "leaflet";

import latlngType from "./types/latlng";
import popupContainerMixin from "./mixins/popupContainer";

export default React.createClass({
  displayName: "Marker",

  mixins: [popupContainerMixin],

  propTypes: {
    position: latlngType.isRequired
  },

  componentWillMount() {
    let {map, position, ...props} = this.props;
    this._leafletElement = Leaflet.marker(position, props);
  },

  componentDidUpdate(prevProps) {
    if (this.props.position !== prevProps.position) {
      this.getLeafletElement().setLatLng(this.props.position);
    }
  }
});
