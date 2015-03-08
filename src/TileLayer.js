import React from "react";
import Leaflet from "leaflet";

import BaseTileLayer from "./BaseTileLayer";

export default class TileLayer extends BaseTileLayer {
  componentWillMount() {
    super.componentWillMount();
    const {map, url, ...props} = this.props;
    this.leafletElement = Leaflet.tileLayer(url, props);
  }

  componentDidUpdate(prevProps) {
    const {url} = this.props;
    if (url && url !== prevProps.url) {
      this.leafletElement.setUrl(url);
    }
  }
}

TileLayer.propTypes = {
  url: React.PropTypes.string.isRequired
};
