import React from "react";

import MapLayer from "./MapLayer";

export default class BaseTileLayer extends MapLayer {
  componentDidUpdate(prevProps) {
    const {opacity, zIndex} = this.props;
    if (opacity && opacity !== prevProps.opacity) {
      this.leafletElement.setOpacity(opacity);
    }
    if (zIndex && zIndex !== prevProps.zIndex) {
      this.leafletElement.setZIndex(zIndex);
    }
  }

  render() {
    return null;
  }
}

BaseTileLayer.propTypes = {
  opacity: React.PropTypes.number,
  zIndex: React.PropTypes.number
};
