import React from "react";
import Leaflet from "leaflet";

import latlngListType from "./types/latlngList";
import PopupContainer from "./PopupContainer";

export default class MultiPolygon extends PopupContainer {
  componentWillMount() {
    super.componentWillMount();
    const {map, polygons, ...props} = this.props;
    this.leafletElement = Leaflet.multiPolygon(polygons, props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.polygons !== prevProps.polygons) {
      this.leafletElement.setLatLngs(this.props.polygons);
    }
  }
}

MultiPolygon.propTypes = {
  polygons: React.PropTypes.arrayOf(latlngListType).isRequired
};
