import React from "react";
import Leaflet from "leaflet";

import PopupContainer from "./PopupContainer";

export default class FeatureGroup extends PopupContainer {
  componentWillMount() {
    const {layers, map, ...props} = this.props;
    this.leafletElement = Leaflet.featureGroup(layers);
  }
}

FeatureGroup.propTypes = {
  layers: React.PropTypes.array.isRequired
};
