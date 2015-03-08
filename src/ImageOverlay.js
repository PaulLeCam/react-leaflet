import React from "react";
import Leaflet from "leaflet";

import boundsType from "./types/bounds";
import MapLayer from "./MapLayer";

export default class ImageOverlay extends MapLayer {
  componentWillMount() {
    super.componentWillMount();
    const {bounds, map, url, ...props} = this.props;
    this.leafletElement = Leaflet.imageOverlay(url, bounds, props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.url !== prevProps.url) {
      this.leafletElement.setUrl(this.props.url);
    }
    if (this.props.opacity !== prevProps.opacity) {
      this.leafletElement.setOpacity(this.props.opacity);
    }
  }

  render() {
    return null;
  }
}

ImageOverlay.propTypes = {
  attribution: React.PropTypes.string,
  bounds: boundsType.isRequired,
  opacity: React.PropTypes.number,
  url: React.PropTypes.string.isRequired
};
