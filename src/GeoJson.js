import React from "react";
import Leaflet from "leaflet";

import PopupContainer from "./PopupContainer";

export default class GeoJson extends PopupContainer {
  componentWillMount() {
    super.componentWillMount();
    const {data, map, ...props} = this.props;
    this.leafletElement = Leaflet.geoJson(data, props);
  }
}

GeoJson.propTypes = {
  data: React.PropTypes.object.isRequired
};
