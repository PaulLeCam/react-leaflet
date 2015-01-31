import React from "react";
import Leaflet from "leaflet";

import latlngListType from "./types/latlngList";
import popupContainerMixin from "./mixins/popupContainer";

export default React.createClass({
  displayName: "MultiPolygon",

  mixins: [popupContainerMixin],

  propTypes: {
    polygons: React.PropTypes.arrayOf(latlngListType).isRequired
  },

  componentWillMount() {
    let {map, polygons, ...props} = this.props;
    this._leafletElement = Leaflet.multiPolygon(polygons, props);
  },

  componentDidUpdate(prevProps) {
    if (this.props.polygons !== prevProps.polygons) {
      this.getLeafletElement().setLatLngs(this.props.polygons);
    }
  }
});
