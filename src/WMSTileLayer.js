import React from "react";
import Leaflet from "leaflet";

import BaseTileLayer from "./BaseTileLayer";

export default class WMSTileLayer extends BaseTileLayer {
  componentWillMount() {
    super.componentWillMount();
    const {map, url, ...props} = this.props;
    this.leafletElement = Leaflet.tileLayer.wms(url, props);
  }
}

WMSTileLayer.propTypes = {
  url: React.PropTypes.string.isRequired
};
