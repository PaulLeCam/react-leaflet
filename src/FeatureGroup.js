import React from "react";
import Leaflet from "leaflet";

import popupContainerMixin from "./mixins/popupContainer";

export default React.createClass({
  displayName: "FeatureGroup",

  mixins: [popupContainerMixin],

  propTypes: {
    layers: React.PropTypes.array.isRequired
  },

  componentWillMount() {
    let {layers, map, ...props} = this.props;
    this._leafletElement = Leaflet.featureGroup(layers);
  }
});
