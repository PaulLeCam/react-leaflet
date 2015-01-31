import React from "react";
import Leaflet from "leaflet";

import popupContainerMixin from "./mixins/popupContainer";

export default React.createClass({
  displayName: "GeoJson",

  mixins: [popupContainerMixin],

  propTypes: {
    data: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {geoJson: Leaflet.geoJson(this.props.data, this.props)};
  },

  componentWillMount() {
    let {data, map, ...props} = this.props;
    this._leafletElement = Leaflet.geoJson(data, props);
  }
});
