import React from "react";
import Leaflet from "leaflet";

import latlngListType from "./types/latlngList";
import PopupContainer from "./PopupContainer";

export default class MultiPolyline extends PopupContainer {
  componentWillMount() {
    super.componentWillMount();
    const {map, polylines, ...props} = this.props;
    this.leafletElement = Leaflet.multiPolyline(polylines, props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.polylines !== prevProps.polylines) {
      this.leafletElement.setLatLngs(this.props.polylines);
    }
  }
}

MultiPolyline.propTypes = {
  polylines: React.PropTypes.arrayOf(latlngListType).isRequired
};
