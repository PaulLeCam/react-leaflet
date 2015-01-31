import React from "react";
import Leaflet from "leaflet";

import latlngListType from "./types/latlngList";
import popupContainerMixin from "./mixins/popupContainer";

export default React.createClass({
  displayName: "MultiPolyline",

  mixins: [popupContainerMixin],

  propTypes: {
    polylines: React.PropTypes.arrayOf(latlngListType).isRequired
  },

  componentWillMount() {
    let {map, polylines, ...props} = this.props;
    this._leafletElement = Leaflet.multiPolyline(polylines, props);
  },

  componentDidUpdate(prevProps) {
    if (this.props.polylines !== prevProps.polylines) {
      this.getLeafletElement().setLatLngs(this.props.polylines);
    }
  }
});
