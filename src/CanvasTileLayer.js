import React from "react";
import Leaflet from "leaflet";

import tileLayerMixin from "./mixins/tileLayer";

export default React.createClass({
  displayName: "CanvasTileLayer",

  mixins: [tileLayerMixin],

  componentWillMount() {
    let {map, ...props} = this.props;
    this._leafletElement =  Leaflet.tileLayer.canvas(props);
  }
});
