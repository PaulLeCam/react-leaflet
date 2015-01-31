import React from "react";
import Leaflet from "leaflet";

import tileLayerMixin from "./mixins/tileLayer";

export default React.createClass({
  displayName: "WMSTileLayer",

  mixins: [tileLayerMixin],

  propTypes: {
    url: React.PropTypes.string.isRequired
  },

  componentWillMount() {
    let {map, url, ...props} = this.props;
    this._leafletElement =  Leaflet.tileLayer.wms(url, props);
  }
});
